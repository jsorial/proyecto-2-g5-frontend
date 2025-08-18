// src/App.jsx (fragmento relevante)
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Consent from './components/Consent';

import AuthChoice from './pages/AuthChoice';
import Nosotros from './pages/Nosotros';
import PatientNosotros from './pages/Patient/PatientNosotros';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import NotFoundPage from './pages/NotFoundPage';

import PatientHome from './pages/Patient/PatientHome';
import PsychHome from './pages/Psychologist/PsychHome';
import PatientProfile from './pages/Patient/PatientProfile';
import PatientTest from './pages/Patient/PatientTest';
import PatientAppointments from './pages/Patient/PatientAppointments';
import PatientProgress from './pages/Patient/PatientProgress';
import PatientResources from './pages/Patient/PatientResources'; // ejemplo
import PatientCreateAppointment from './pages/Patient/PatientCreateAppointment';
import ManagePatients from './pages/Psychologist/ManagePatients';
import CreatePatient from './pages/Psychologist/CreatePatient';       // Importa creación
import EditPatient from './pages/Psychologist/EditPatient';           // Importa edición
import ManageAppointments from './pages/Psychologist/ManageAppointments';
import CreateAppointment from './pages/Psychologist/CreateAppointment';
import EditAppointment from './pages/Psychologist/EditAppointment';
import TestResults from './pages/Psychologist/TestResults';
import TestOverview from './pages/Psychologist/TestOverview';
import PsychProgress from './pages/Psychologist/PsychProgress';
import TestResultDetail from './pages/Psychologist/TestResultDetail';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import PatientSurvey from './pages/Patient/PatientSurvey';
import Forbidden from './pages/Forbidden';


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
                element={<ProtectedRoute allowedRoles={['patient']} element={<PatientHome />} />}
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

              <Route
                path="/patient/nosotros"
                element={<ProtectedRoute allowedRoles={['patient']} element={<PatientNosotros />} />}
              />



              <Route
                path="/patient/schedule-extra"
                element={<ProtectedRoute allowedRoles={['patient']} element={<PatientCreateAppointment />} preset="extra" />}
              />

              <Route
                path="/patient/survey"
                element={<ProtectedRoute allowedRoles={['patient']} element={<PatientSurvey />} />}
              />
     




              {/* Rutas de psicóloga (protegidas) */}
              <Route
                path="/psych/home"
                element={<ProtectedRoute allowedRoles={['psychologist']} element={<PsychHome />} />}
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

              <Route path="/psych/psych/:id/progress" element={<PsychProgress />} />
              <Route path="/psych/test-results/:testId" element={<TestResultDetail />} />

              <Route
                path="/psych/results-test"
                element={<ProtectedRoute allowedRoles={['psychologist']} element={<TestResults />} />}
              />

              <Route
                path="/psych/test-overview"
                element={<ProtectedRoute allowedRoles={['psychologist']} element={<TestOverview />} />}
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
