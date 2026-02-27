import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Leaf, Recycle, ShieldCheck, Truck } from 'lucide-react';
import LiveMap from '../components/maps/LiveMap';
import StatCard from '../components/dashboard/StatCard';
import SystemStatus from '../components/dashboard/SystemStatus';
import GlassCard from '../components/common/GlassCard';
import { useDataStore } from '../context/DataContext';

const AdminDashboard = () => {
  const { stats, bins } = useDataStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">EcoSphere Pro Command Nexus</h1>
          <p className="text-sm text-slate-300">Predictive municipal orchestration for Gurugram.</p>
        </div>
        <motion.div className="rounded-full border border-nexus-eco/40 bg-nexus-eco/10 px-4 py-1 text-xs text-nexus-eco" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          AI status: Overflow prediction active in Sector 29
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Waste Collected" value={`${stats.wasteKg}kg`} hint="+18% wow" icon={Recycle} />
        <StatCard title="Carbon Saved" value={`${stats.carbonSavedKg}kg`} hint="30% emission drop" icon={Leaf} />
        <StatCard title="Overflowing" value={stats.overflowingBins} hint="priority route generated" icon={Truck} />
        <StatCard title="Eco Credits" value={`₹${stats.ecoCreditsIssued}`} hint="₹0.10 per 10g" icon={ShieldCheck} />
        <StatCard title="AI Confidence" value={`${stats.aiConfidence}%`} hint="MobileNetV2 + SSIM" icon={BrainCircuit} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <LiveMap />
        </div>
        <div className="space-y-4">
          <SystemStatus />
          <GlassCard>
            <h3 className="text-sm font-semibold">Priority Bins</h3>
            <div className="mt-3 space-y-2">
              {bins
                .filter((item) => item.fill > 60)
                .map((item) => (
                  <div key={item.id} className="rounded-xl bg-white/5 p-3 text-xs">
                    <p className="font-semibold">{item.id} · {item.area}</p>
                    <p className="text-slate-300">Fill {item.fill}% · predicted {item.predictedFill}%</p>
                  </div>
                ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
