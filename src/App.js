import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { useDataStore } from './context/DataContext';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const FleetManager = lazy(() => import('./pages/FleetManager'));
const Analytics = lazy(() => import('./pages/Analytics'));
const UserApp = lazy(() => import('./pages/UserApp'));

const queryClient = new QueryClient();

const App = () => {
  const { mode, setMode } = useDataStore();

  useEffect(() => {
    document.documentElement.dataset.theme = mode === 'light' ? 'light' : 'dark';
  }, [mode]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-nexus-midnight text-white">
          <aside className="fixed left-4 top-4 z-20 hidden w-56 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl lg:block">
            {['/', '/fleet', '/analytics', '/app'].map((path) => (
              <NavLink key={path} to={path} className="mb-2 block rounded-lg px-3 py-2 text-sm hover:bg-white/10">
                {path === '/' ? 'Admin' : path.replace('/', '').toUpperCase()}
              </NavLink>
            ))}
            <button className="mt-2 w-full rounded-lg bg-white/10 px-3 py-2 text-xs" onClick={() => setMode(mode === 'neon' ? 'light' : 'neon')}>
              Toggle mode
            </button>
          </aside>
          <main className="mx-auto max-w-7xl p-6 lg:pl-72">
            <Suspense fallback={<div className="animate-pulse text-nexus-glow">Loading ecosystem stream...</div>}>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/fleet" element={<FleetManager />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/app" element={<UserApp />} />
                </Routes>
              </motion.div>
            </Suspense>
          </main>
          <ToastContainer theme="dark" />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
