import React from 'react';
import GlassCard from '../common/GlassCard';
import { formatCurrency } from '../../utils/helpers';

const Wallet = ({ credits = 248.2 }) => (
  <GlassCard className="bg-gradient-to-br from-nexus-glow/20 to-nexus-eco/10">
    <p className="text-xs uppercase text-slate-300">On-chain Eco-Credit Wallet</p>
    <h3 className="mt-2 text-3xl font-bold">{formatCurrency(credits)}</h3>
    <p className="mt-1 text-xs text-nexus-eco">Wagmi-ready wallet module connected.</p>
  </GlassCard>
);

export default Wallet;
