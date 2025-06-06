// src/pages/Patient/PatientHome.jsx
import React from 'react';
import Carousel from '../../components/Carousel';
import { Link } from 'react-router-dom';

export default function PatientHome() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Bienvenida */}
      <section className="text-center bg-white p-8 rounded-lg shadow border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">¡Bienvenido(a), Paciente!</h2>
        <p className="text-gray-600">
          Accede a tu test psicométrico, revisa tus citas y observa tu progreso a lo largo de tu tratamiento.
        </p>
      </section>

      {/* Carrusel de testimonios */}
      <section>
        <Carousel />
      </section>

      {/* Accesos rápidos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/patient/test"
          className="block bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-lg p-6 text-center transition"
        >
          Realizar Test Psicométrico
        </Link>
        <Link
          to="/patient/appointments"
          className="block bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-lg p-6 text-center transition"
        >
          Mis Citas Programadas
        </Link>
        <Link
          to="/patient/progress"
          className="block bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium rounded-lg p-6 text-center transition"
        >
          Mi Progreso
        </Link>
        <Link
          to="/patient/profile"
          className="block bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded-lg p-6 text-center transition"
        >
          Mi Perfil
        </Link>
      </section>
    </div>
  );
}
