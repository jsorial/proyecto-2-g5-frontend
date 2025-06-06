// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './pages/Index';
import NotFoundPage from './pages/NotFoundPage';
import Consent from './components/Consent';
import MixedPsychometricTest from './components/MixedPsychometricTest';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navbar */}
        <Navbar />

        {/* Contenido principal */}
        <main className="flex-grow py-8">
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Ruta de consentimiento */}
            <Route path="/consentimiento" element={<Consent />} />

            {/* Solo se accede al test una vez que aceptaron consentimiento */}
            <Route 
              path="/test-psicometrico" 
              element={<MixedPsychometricTest />} 
            />

            {/* Otras rutas existentes, ej. /recursos, /perfil */}
            <Route path="/recursos" element={<div> {/* ... */} </div>} />
            <Route path="/perfil" element={<div> {/* ... */} </div>} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
