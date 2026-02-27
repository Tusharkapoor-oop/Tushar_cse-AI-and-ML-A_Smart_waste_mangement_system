import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/common/GlassCard';

const trucks = [
  { id: 'TRK-22', status: 'Collecting', eta: '14 min', carbon: 72 },
  { id: 'TRK-09', status: 'Idle', eta: 'Standby', carbon: 48 },
  { id: 'TRK-31', status: 'Rerouting', eta: '7 min', carbon: 66 }
];

const FleetManager = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Fleet Operations Theater</h1>
    <div className="grid gap-4 lg:grid-cols-3">
      {trucks.map((truck) => (
        <GlassCard key={truck.id}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{truck.id}</h3>
            <motion.span className="text-xs text-nexus-glow" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }}>
              {truck.status}
            </motion.span>
          </div>
          <p className="mt-2 text-sm text-slate-300">ETA: {truck.eta}</p>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-gradient-to-r from-nexus-eco to-nexus-glow" style={{ width: `${truck.carbon}%` }} />
          </div>
        </GlassCard>
      ))}
    </div>
  </div>
);

export default FleetManager;
