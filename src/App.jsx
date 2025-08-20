// src/App.jsx (fragmento relevante)
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Consent from './components/Consent';

import AuthChoice from './pages/AuthChoice';
import Nosotros from './pages/Nosotros';

import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import NotFoundPage from './pages/NotFoundPage';

import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

import Forbidden from './pages/Forbidden';

//import PatientProfile from './pages/Patient/PatientProfile';
import PatientTest from './pages/Patient/PatientTest';
//import PatientProgress from './pages/Patient/PatientProgress';
//import PatientResources from './pages/Patient/PatientResources'; // ejemplo

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />

          <main className="flex-grow py-0">
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<AuthChoice />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/consentimiento" element={<Consent />} />




              {/* Rutas de paciente (protegidas) */}
              <Route
                path="/patient/home"
                element={<ProtectedRoute allow={['PACIENTE']} element={<AuthChoice />} />}
              />
              <Route
                path="/patient/profile"
                element={<ProtectedRoute allow={['PACIENTE']} element={<AuthChoice />} />}
              />

               <Route
                path="/patient/test"
                element={<ProtectedRoute allow={['patient']} element={<PatientTest />} />}
              />

              {/* Pantalla acceso denegado */}
              <Route path="/forbidden" element={<Forbidden />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
