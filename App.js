import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import AdminDashboard from './pages/AdminDashboard';
import UserApp from './pages/UserApp';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/app" element={<UserApp />} />
          {/* Add other routes (FleetManager, Analytics) here */}
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;