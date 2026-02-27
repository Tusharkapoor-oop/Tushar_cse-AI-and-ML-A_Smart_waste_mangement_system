import React from 'react';
import { motion } from 'framer-motion';

const QrScanner = () => (
  <motion.div className="relative rounded-2xl border border-dashed border-nexus-glow/70 bg-white/5 p-6 text-center" whileHover={{ scale: 1.01 }}>
    <div className="mx-auto h-44 max-w-sm rounded-xl border border-white/20 bg-gradient-to-br from-nexus-panel to-nexus-midnight p-4">
      <div className="h-full animate-shimmer rounded bg-[linear-gradient(100deg,rgba(255,255,255,.08)_20%,rgba(45,246,164,.2)_40%,rgba(255,255,255,.08)_60%)] bg-[length:200%_100%]" />
    </div>
    <p className="mt-4 text-sm text-slate-300">AR QR scanner preview (Webcam integration placeholder).</p>
  </motion.div>
);

export default QrScanner;
