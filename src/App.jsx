// src/App.jsx (fragmento relevante)
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Consent from './components/Consent';

import AuthChoice from './pages/AuthChoice';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';

import PatientDashboard from './pages/Patient/PatientDashboard';
import PatientProfile from './pages/Patient/PatientProfile';
import PatientTest from './pages/Patient/PatientTest';
import PatientAppointments from './pages/Patient/PatientAppointments';
import PatientProgress from './pages/Patient/PatientProgress';
import PatientResources from './pages/Patient/PatientDashboard'; // ejemplo

import PsychDashboard from './pages/Psychologist/PsychDashboard';
import ManagePatients from './pages/Psychologist/ManagePatients';
import CreatePatient from './pages/Psychologist/CreatePatient';       // Importa creación
import EditPatient from './pages/Psychologist/EditPatient';           // Importa edición
import ManageAppointments from './pages/Psychologist/ManageAppointments';
import CreateAppointment from './pages/Psychologist/CreateAppointment';
import EditAppointment from './pages/Psychologist/EditAppointment';
import PsychProgress from './pages/Psychologist/PsychProgress';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />

          <main className="flex-grow py-8">
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<AuthChoice />} />
              <Route path="/login" element={<Login />} />
              <Route path="/consentimiento" element={<Consent />} />

              {/* Rutas de paciente (protegidas) */}
              <Route
                path="/patient/home"
                element={<ProtectedRoute allowedRoles={['patient']} element={<PatientDashboard />} />}
              />
              <Route
                path="/patient/profile"
                element={<ProtectedRoute allowedRoles={['patient']} element={<PatientProfile />} />}
              />
              <Route
                path="/patient/test"
                element={<ProtectedRoute allowedRoles={['patient']} element={<PatientTest />} />}
              />
              <Route
                path="/patient/appointments"
                element={<ProtectedRoute allowedRoles={['patient']} element={<PatientAppointments />} />}
              />
              <Route
                path="/patient/progress"
                element={<ProtectedRoute allowedRoles={['patient']} element={<PatientProgress />} />}
              />
              <Route
                path="/patient/resources"
                element={<ProtectedRoute allowedRoles={['patient']} element={<PatientResources />} />}
              />

              {/* Rutas de psicóloga (protegidas) */}
              <Route
                path="/psych/home"
                element={<ProtectedRoute allowedRoles={['psychologist']} element={<PsychDashboard />} />}
              />
              <Route
                path="/psych/manage-patients"
                element={<ProtectedRoute allowedRoles={['psychologist']} element={<ManagePatients />} />}
              />
              <Route
                path="/psych/create-patient"
                element={<ProtectedRoute allowedRoles={['psychologist']} element={<CreatePatient />} />}
              />
              <Route
                path="/psych/edit-patient/:idDoc"
                element={<ProtectedRoute allowedRoles={['psychologist']} element={<EditPatient />} />}
              />
              <Route
                path="/psych/manage-appointments"
                element={<ProtectedRoute allowedRoles={['psychologist']} element={<ManageAppointments />} />}
              />

              <Route
                path="/psych/create-appointment"
                element={<ProtectedRoute allowedRoles={['psychologist']} element={<CreateAppointment />} />}
              />

              <Route
                path="/psych/edit-appointment/:id"
                element={<ProtectedRoute allowedRoles={['psychologist']} element={<EditAppointment />} />}
              />

              <Route
                path="/psych/progress"
                element={<ProtectedRoute allowedRoles={['psychologist']} element={<PsychProgress />} />}
              />

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
