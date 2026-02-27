import React from 'react';
import GlassCard from '../common/GlassCard';

const SystemStatus = () => (
  <GlassCard>
    <h3 className="text-sm font-semibold text-slate-200">AI Diagnostics</h3>
    <ul className="mt-3 space-y-2 text-xs text-slate-300">
      <li>MobileNetV2 classifier confidence: 97.1%</li>
      <li>SSIM integrity gate active for all bins.</li>
      <li>LSTM overflow predictor flagged Sector 29 in 42 mins.</li>
    </ul>
  </GlassCard>
);

export default SystemStatus;
