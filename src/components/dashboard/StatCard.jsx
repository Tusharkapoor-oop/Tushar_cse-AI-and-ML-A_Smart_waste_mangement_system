import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';

const StatCard = ({ title, value, hint, icon: Icon }) => (
  <GlassCard className="relative overflow-hidden">
    <motion.div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-nexus-glow/20 blur-2xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 4, repeat: Infinity }} />
    <div className="relative flex items-start justify-between">
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-300">{title}</p>
        <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        <p className="mt-1 text-xs text-nexus-eco">{hint}</p>
      </div>
      <Icon className="text-nexus-glow" />
    </div>
  </GlassCard>
);

export default StatCard;
