import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { QrCode, Wallet, MapPin, Award, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserApp = () => {
  const { user } = useData();
  const [activeTab, setActiveTab] = useState('wallet');

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto h-screen bg-cyber-dark relative overflow-hidden flex flex-col border-x border-white/5">
      
      {/* Top Bar */}
      <div className="p-6 pt-8 bg-gradient-to-b from-emerald-900/50 to-transparent">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Hello, {user.name.split(' ')[0]} 👋</h2>
            <p className="text-emerald-400 text-xs font-mono">Level 5 Recycler</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-cyber-dark font-bold shadow-lg shadow-emerald-500/30">
            {user.name[0]}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 p-6 space-y-6">
        
        {/* Wallet Card */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <span className="text-emerald-100 text-sm font-medium">Eco-Credits Balance</span>
            <div className="text-4xl font-bold text-white mt-1">₹{user.credits}</div>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur text-white py-2 rounded-xl text-xs font-bold transition-all">
                Redeem
              </button>
              <button className="flex-1 bg-cyber-dark/30 hover:bg-cyber-dark/50 text-white py-2 rounded-xl text-xs font-bold transition-all">
                History
              </button>
            </div>
          </div>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-square hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <QrCode size={24} />
            </div>
            <span className="text-sm font-medium">Scan Bin</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-square hover:bg-white/5 transition-colors cursor-pointer">
             <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <MapPin size={24} />
            </div>
            <span className="text-sm font-medium">Find Bin</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Recent Activity</h3>
          <div className="space-y-3">
            {user.history.map((item) => (
              <div key={item.id} className="glass-panel p-4 rounded-xl flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                    <History size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{item.action}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                </div>
                <div className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2 py-1 rounded">
                  {item.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 w-full bg-cyber-card/90 backdrop-blur-xl border-t border-white/5 p-4 flex justify-around items-center z-50">
        <NavIcon icon={Wallet} label="Wallet" active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} />
        <div className="relative -top-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40 border-4 border-cyber-dark cursor-pointer transform hover:scale-105 transition-transform">
            <QrCode className="text-white" size={28} />
          </div>
        </div>
        <NavIcon icon={Award} label="Awards" active={activeTab === 'awards'} onClick={() => setActiveTab('awards')} />
      </div>

    </div>
  );
};

const NavIcon = ({ icon: Icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-emerald-400' : 'text-gray-500'}`}>
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] font-medium">{label}</span>
  </div>
);

export default UserApp;