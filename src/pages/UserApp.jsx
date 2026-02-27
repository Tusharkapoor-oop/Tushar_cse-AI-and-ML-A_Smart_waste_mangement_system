import React from 'react';
import { Award, MapPinned } from 'lucide-react';
import QrScanner from '../components/mobile/QrScanner';
import Wallet from '../components/mobile/Wallet';
import GlassCard from '../components/common/GlassCard';

const UserApp = () => (
  <div className="mx-auto max-w-xl space-y-6">
    <h1 className="text-3xl font-bold">Citizen Recycling Portal</h1>
    <Wallet />
    <QrScanner />
    <GlassCard>
      <h3 className="text-sm font-semibold">Achievement Nebula</h3>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl bg-white/5 p-3"><Award className="mb-2 text-nexus-eco" size={16} />Plastic Pioneer</div>
        <div className="rounded-xl bg-white/5 p-3"><MapPinned className="mb-2 text-nexus-glow" size={16} />Nearest smart bin synced</div>
      </div>
    </GlassCard>
  </div>
);

export default UserApp;
