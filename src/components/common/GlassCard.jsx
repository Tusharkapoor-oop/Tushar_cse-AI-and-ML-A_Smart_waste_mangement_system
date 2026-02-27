import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '' }) => (
  <motion.section
    whileHover={{ y: -4 }}
    className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-glass ${className}`}
  >
    {children}
  </motion.section>
);

export default GlassCard;
