import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardClaroPage from './pages/DashboardClaroPage';
import DashboardVentasPage from './pages/DashboardVentasPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard-claro" replace />} />
            <Route path="/dashboard-claro" element={<DashboardClaroPage />} />
            <Route path="/dashboard-ventas" element={<DashboardVentasPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
