import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LSTM_FORECAST } from '../utils/constants';
import GlassCard from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { jsPDF } from 'jspdf';

const Analytics = () => {
  const exportReport = () => {
    const pdf = new jsPDF();
    pdf.text('EcoSphere Predictive Report', 12, 14);
    pdf.text('LSTM fill trend monitored for Gurugram clusters.', 12, 24);
    pdf.save('ecosphere-report.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Data Nexus</h1>
        <Button onClick={exportReport}>Export PDF</Button>
      </div>
      <GlassCard className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={LSTM_FORECAST}>
            <defs>
              <linearGradient id="pred" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#23d3ff" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#23d3ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Area type="monotone" dataKey="predicted" stroke="#23d3ff" fill="url(#pred)" />
            <Area type="monotone" dataKey="actual" stroke="#2df6a4" fillOpacity={0} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
};

export default Analytics;
