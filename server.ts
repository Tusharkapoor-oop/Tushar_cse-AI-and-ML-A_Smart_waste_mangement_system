import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import multer from "multer";
import { MongoMemoryServer } from "mongodb-memory-server";

// Setup storage for citizen reports
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Setup MongoDB Memory Server for demonstration purposes
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB Memory Server");

  // 2. Create Mongoose schema for a Bin
  interface IBin {
    binID: string;
    lat: number;
    lng: number;
    fillLevel: number;
    status: "standby" | "active";
    lastReportedImage?: string;
    isVerified: boolean;
  }

  const binSchema = new mongoose.Schema<IBin>({
    binID: { type: String, required: true, unique: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    fillLevel: { type: Number, required: true, min: 0, max: 100 },
    status: { type: String, enum: ["standby", "active"], default: "standby" },
    lastReportedImage: { type: String },
    isVerified: { type: Boolean, default: false },
  });

  // 3. Write a Mongoose pre-save hook
  binSchema.pre("save", function () {
    if (this.fillLevel >= 70) {
      this.status = "active";
    } else {
      this.status = "standby";
    }
  });

  const Bin = mongoose.model("Bin", binSchema);

  // Helper function to seed data if empty
  async function ensureSeed() {
    try {
      const count = await Bin.countDocuments();
      if (count === 0) {
        console.log("Database empty, auto-seeding...");
        const pitampuraCenter = { lat: 28.7033, lng: 77.1323 };
        const binsData = [];
        for (let i = 1; i <= 30; i++) {
          const latOffset = (Math.random() - 0.5) * 0.02;
          const lngOffset = (Math.random() - 0.5) * 0.02;
          binsData.push({
            binID: `BIN-${String(i).padStart(3, "0")}`,
            lat: pitampuraCenter.lat + latOffset,
            lng: pitampuraCenter.lng + lngOffset,
            fillLevel: Math.floor(Math.random() * 101),
          });
        }
        await Bin.insertMany(binsData);
        console.log("Auto-seeded 30 bins.");
      }
    } catch (error) {
      console.error("Auto-seed failed:", error);
    }
  }

  // Background task to fluctuate fill levels
  setInterval(async () => {
    try {
      const bins = await Bin.find();
      for (const bin of bins) {
        // Randomly fluctuate fill level by -2 to +5%
        const fluctuation = Math.floor(Math.random() * 8) - 2;
        bin.fillLevel = Math.min(100, Math.max(0, bin.fillLevel + fluctuation));
        await bin.save();
      }
    } catch (error) {
      console.error("Error fluctuating fill levels:", error);
    }
  }, 10000); // Every 10 seconds

  app.use(express.json());
  app.use("/uploads", express.static("uploads"));

  // Serve citizen portal
  app.get("/citizen", (req, res) => {
    res.sendFile(path.join(process.cwd(), "citizen.html"));
  });

  // Helper function: Haversine formula
  function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Greedy Nearest Neighbor (GNN) algorithm
  function getOptimizedRoute(depot: { lat: number; lng: number }, activeBins: any[]) {
    let currentPos = depot;
    const unvisited = [...activeBins];
    const route = [];
    let totalDistance = 0;

    while (unvisited.length > 0) {
      let nearestIndex = -1;
      let minDistance = Infinity;

      for (let i = 0; i < unvisited.length; i++) {
        const distance = haversineDistance(
          currentPos.lat,
          currentPos.lng,
          unvisited[i].lat,
          unvisited[i].lng
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = i;
        }
      }

      const nearestBin = unvisited.splice(nearestIndex, 1)[0];
      route.push(nearestBin);
      totalDistance += minDistance;
      currentPos = { lat: nearestBin.lat, lng: nearestBin.lng };
    }

    return { route, totalDistance };
  }

  // API Routes
  app.get("/api/bins", async (req, res) => {
    try {
      await ensureSeed(); // Ensure data exists
      const bins = await Bin.find();
      res.json(bins);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bins" });
    }
  });

  app.get("/api/optimized-route", async (req, res) => {
    try {
      const activeBins = await Bin.find({ status: "active" });
      const pitampuraDepot = { lat: 28.7033, lng: 77.1323 };
      
      const result = getOptimizedRoute(pitampuraDepot, activeBins);
      res.json({
        ...result,
        depot: pitampuraDepot,
        truckLocation: pitampuraDepot // Simulated truck location
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate optimized route" });
    }
  });

  app.post("/api/report-surge", upload.single("image"), async (req, res) => {
    console.log("Received surge report:", req.body);
    try {
      const { binID } = req.body;
      const file = req.file;

      if (!binID) {
        console.error("Missing binID in report");
        return res.status(400).json({ error: "binID is required" });
      }

      const bin = await Bin.findOne({ binID });
      if (!bin) {
        console.error(`Bin ${binID} not found in database`);
        return res.status(404).json({ error: "Bin not found" });
      }

      // Update bin data
      bin.fillLevel = 100;
      bin.isVerified = !!file;
      if (file) {
        bin.lastReportedImage = `/uploads/${file.filename}`;
        console.log(`Image uploaded for ${binID}: ${bin.lastReportedImage}`);
      }
      
      await bin.save();
      console.log(`Successfully updated ${binID} to active status.`);

      res.json({ 
        message: `Surge reported for ${binID}. ${bin.isVerified ? 'Verified and fill level set to 100%.' : 'Reported, pending verification.'}`, 
        bin 
      });
    } catch (error) {
      console.error("Error in report-surge:", error);
      res.status(500).json({ error: "Failed to report surge" });
    }
  });

  // 4. Write a 'seed' function and API route GET /seed
  app.get("/api/seed", async (req, res) => {
    try {
      await Bin.deleteMany({}); // Clear existing

      const pitampuraCenter = { lat: 28.7033, lng: 77.1323 };
      const binsData = [];

      for (let i = 1; i <= 30; i++) {
        // Generate realistic coordinates around Pitampura
        const latOffset = (Math.random() - 0.5) * 0.02; // ~2km range
        const lngOffset = (Math.random() - 0.5) * 0.02;
        
        const fillLevel = Math.floor(Math.random() * 101);

        binsData.push({
          binID: `BIN-${String(i).padStart(3, "0")}`,
          lat: pitampuraCenter.lat + latOffset,
          lng: pitampuraCenter.lng + lngOffset,
          fillLevel: fillLevel,
          // status will be set by pre-save hook
        });
      }

      const insertedBins = await Bin.insertMany(binsData);
      res.json({ message: "Seeded 30 bins in Pitampura", count: insertedBins.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to seed database" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
