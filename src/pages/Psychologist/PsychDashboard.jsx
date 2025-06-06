// src/pages/Psychologist/PsychDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PsychDashboard() {
  const [stats, setStats] = useState({
    pacientesActivos: 0,
    citasHoy: 0,
    citasPendientes: 0,
  });

  useEffect(() => {
    // Simular carga de estadísticas
    const datosSimulados = {
      pacientesActivos: 24,
      citasHoy: 3,
      citasPendientes: 5,
    };
    setStats(datosSimulados);
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Bienvenida */}
      <section className="text-center bg-white p-8 rounded-lg shadow border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bienvenida, Psicóloga</h2>
        <p className="text-gray-600">
          Desde aquí puedes gestionar a tus pacientes, programar citas y hacer seguimiento de su progreso.
        </p>
      </section>

      {/* Estadísticas generales */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-green-100 text-green-700 p-6 rounded-lg shadow border border-green-200 text-center">
          <p className="text-xl font-bold">{stats.pacientesActivos}</p>
          <p>Pacientes Activos</p>
        </div>
        <div className="bg-blue-100 text-blue-700 p-6 rounded-lg shadow border border-blue-200 text-center">
          <p className="text-xl font-bold">{stats.citasHoy}</p>
          <p>Citas Hoy</p>
        </div>
        <div className="bg-yellow-100 text-yellow-700 p-6 rounded-lg shadow border border-yellow-200 text-center">
          <p className="text-xl font-bold">{stats.citasPendientes}</p>
          <p>Citas Pendientes</p>
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/psych/manage-patients"
          className="block bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded-lg p-6 text-center transition"
        >
          Gestionar Pacientes
        </Link>
        <Link
          to="/psych/manage-appointments"
          className="block bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg p-6 text-center transition"
        >
          Gestionar Citas
        </Link>
      </section>
    </div>
  );
}
