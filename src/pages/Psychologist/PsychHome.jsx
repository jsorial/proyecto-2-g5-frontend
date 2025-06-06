// src/pages/Psychologist/PsychHome.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function PsychHome() {
  const { user } = useAuth(); // Asumimos que user contiene { nombre: 'Dra. María López', ... }
  const [stats, setStats] = useState({
    pacientesActivos: 0,
    citasHoy: 0,
    citasPendientes: 0,
  });

  useEffect(() => {
    // Simular fetch('/api/psych/dashboard')
    const datosSimulados = {
      pacientesActivos: 24,
      citasHoy: 3,
      citasPendientes: 5,
    };
    setStats(datosSimulados);
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      {/* ==================== Sección de Bienvenida ==================== */}
      <section className="relative bg-loginBg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          {/* Imagen de Blue */}
          <div className="md:w-1/2 flex justify-center py-8 md:py-0">
            <img
              src="/images/Blue.png"
              alt="Blue, tu guía"
              className="w-48 h-auto md:w-64"
            />
          </div>

          {/* Texto de bienvenida y botón */}
          <div className="md:w-1/2 px-6 py-8 md:px-10 md:py-0">
            <h1 className="text-4xl md:text-5xl font-bold text-primaryText mb-2">
              ¡Bienvenidx!
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-primaryText mb-4">
              {user?.nombre || 'Psicóloga'}
            </h2>
            <p className="text-gray-700 mb-6 max-w-lg">
              Soy Blue, y estoy muy emocionado por ver cómo nuestros pacientes han ido mejorando
              y poder ayudarte en tu trabajo. ¿Quieres ver los resultados del test psicométrico?
            </p>
            <Link
              to="/psych/results-test"
              className="inline-block px-6 py-3 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
            >
              Resultados Test Psicométrico
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== Sección de Estadísticas ==================== */}
      <section className="bg-white rounded-lg shadow border border-gray-200 p-8">
        <h3 className="text-2xl font-semibold text-formTitle mb-6 text-center">
          Nuestros Resultados Generales
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Pacientes Activos */}
          <div className="bg-[#d4f5da] text-[#227a1f] p-6 rounded-lg shadow border border-green-200 text-center">
            <p className="text-3xl font-bold">{stats.pacientesActivos}</p>
            <p className="mt-2 font-medium">Pacientes Activos</p>
          </div>

          {/* Citas Hoy */}
          <div className="bg-[#d7eaff] text-[#1f4f8f] p-6 rounded-lg shadow border border-blue-200 text-center">
            <p className="text-3xl font-bold">{stats.citasHoy}</p>
            <p className="mt-2 font-medium">Citas Hoy</p>
          </div>

          {/* Citas Pendientes */}
          <div className="bg-[#fff5cc] text-[#7a5d00] p-6 rounded-lg shadow border border-yellow-200 text-center">
            <p className="text-3xl font-bold">{stats.citasPendientes}</p>
            <p className="mt-2 font-medium">Citas Pendientes</p>
          </div>
        </div>
      </section>

      {/* ==================== Accesos Rápidos ==================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/psych/manage-patients"
          className="block bg-[#ea8bc5] hover:bg-pink-300 text-white font-medium rounded-lg p-6 text-center transition"
        >
          Gestionar Pacientes
        </Link>
        <Link
          to="/psych/manage-appointments"
          className="block bg-[#88a2d7] hover:bg-blue-300 text-white font-medium rounded-lg p-6 text-center transition"
        >
          Gestionar Citas
        </Link>
      </section>
    </div>
  );
}
