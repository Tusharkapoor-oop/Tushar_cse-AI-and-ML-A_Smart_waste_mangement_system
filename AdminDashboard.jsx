import React from 'react';
import { useData } from '../context/DataContext';
import StatCard from '../components/common/StatCard';
import LiveMap from '../components/maps/LiveMap';
import { Trash2, Truck, Leaf, Zap, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AdminDashboard = () => {
  const { bins, stats, loading } = useData();

  if (loading) return <div className="flex h-screen items-center justify-center text-emerald-500">Initializing EcoSphere Core...</div>;

  // Chart Data Preparation
  const chartData = bins.map(b => ({ name: b.id, fill: b.fill }));

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
            EcoSphere Pro
          </h1>
          <p className="text-gray-400 text-sm mt-1">Smart City Waste Management Authority</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          SYSTEM ONLINE
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Collected" value={`${stats.totalWaste} kg`} icon={Trash2} color="emerald" subtext="+12% vs last week" />
        <StatCard title="CO₂ Reduced" value={`${stats.co2Saved} kg`} icon={Leaf} color="cyan" subtext="Equivalent to 40 trees" />
        <StatCard title="Active Fleet" value="8 Trucks" icon={Truck} color="blue" subtext="Route Optimization Active" />
        <StatCard title="Eco-Credits" value={`₹${stats.credits}`} icon={Zap} color="yellow" subtext="Distributed to citizens" />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Map & Route */}
        <div className="lg:col-span-2 space-y-6">
          <LiveMap />
          
          {/* Analytics Chart */}
          <div className="glass-panel p-6 rounded-2xl h-[300px]">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Real-Time Fill Levels</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="fill" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill > 80 ? '#ef4444' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Priority List & Alerts */}
        <div className="space-y-6">
          
          {/* Priority Bins */}
          <div className="glass-panel p-6 rounded-2xl h-full max-h-[400px] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-200">Priority Collection</h3>
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">High Urgency</span>
            </div>
            
            <div className="overflow-y-auto pr-2 space-y-3 flex-1 custom-scrollbar">
              {bins.filter(b => b.fill > 50).map(bin => (
                <div key={bin.id} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border-l-4 border-red-500 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm">{bin.id}</div>
                    <div className="text-xs text-gray-400">Sector 14 • {bin.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-red-400">{bin.fill}%</div>
                    <div className="text-[10px] text-gray-500">Fill Level</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-200 flex items-center gap-2">
              <AlertTriangle size={18} className="text-yellow-400" />
              System Alerts
            </h3>
            <div className="space-y-3">
              <div className="text-sm p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200">
                Warning: Gas sensor trigger at BIN-A003 (Methane High)
              </div>
              <div className="text-sm p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200">
                Info: Fleet #4 route optimized for traffic.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;