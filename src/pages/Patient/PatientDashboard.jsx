// src/pages/Patient/PatientDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel';

export default function PatientDashboard() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Bienvenida */}
      <section className="text-center bg-white p-8 rounded-lg shadow border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">¡Bienvenido(a), Paciente!</h2>
        <p className="text-gray-600">
          Aquí podrás:
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Realizar tu Test Psicométrico</li>
          <li>Ver tus citas programadas</li>
          <li>Revisar tu progreso mes a mes</li>
          <li>Actualizar tu perfil y datos de contacto</li>
        </ul>
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
