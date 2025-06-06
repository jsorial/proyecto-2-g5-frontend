// src/pages/Psychologist/PsychHome.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function PsychHome() {
  const { user } = useAuth(); // user.nombre por ejemplo "Dra. María López"
  const [stats, setStats] = useState({
    pacientesActivos: 0,
    citasHoy: 0,
    citasPendientes: 0,
  });

  useEffect(() => {
    // Datos simulados:
    const datosSimulados = {
      pacientesActivos: 24,
      citasHoy: 3,
      citasPendientes: 5,
    };
    setStats(datosSimulados);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ————— Separación del Navbar —————
      <div className="pt-6"></div> */}

      {/* ========== SECCIÓN BIENVENIDA (“Blue”) ========== */}
      <section className="w-full bg-loginBg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-12 px-4 sm:px-6 lg:px-8">
          {/* Imagen “Blue” */}
          <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img
              src="/images/Blue.png"
              alt="Blue, tu guía"
              className="w-56 h-auto md:w-72"
            />
          </div>

          {/* Texto y botón */}
          <div className="md:w-1/2 flex flex-col items-start">
            <h1 className="text-4xl md:text-5xl font-bold text-primaryText mb-2">
              ¡Bienvenidx!
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-primaryText mb-4">
              {user?.nombre || 'Psicóloga'}
            </h2>
            <p className="text-gray-700 mb-6 max-w-lg">
              Soy Blue, y estoy muy emocionado por ver cómo nuestros pacientes han
              ido mejorando y poder ayudarte en tu trabajo. ¿Vemos los resultados
              de nuestro test psicométrico?
            </p>
            <Link
              to="/psych/results-test"
              className="inline-block px-8 py-3 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
            >
              Resultados Test Psicométrico
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN “NUESTROS RESULTADOS GENERALES” ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h3 className="text-2xl sm:text-3xl font-semibold text-formTitle text-center mb-8">
          NUESTROS RESULTADOS GENERALES
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Pacientes Activos */}
          <div className="bg-[#d4f5da] text-[#227a1f] p-8 rounded-lg shadow border border-green-200 text-center">
            <p className="text-4xl font-bold">{stats.pacientesActivos}</p>
            <p className="mt-2 text-lg font-medium">Pacientes Activos</p>
          </div>

          {/* Citas Hoy */}
          <div className="bg-[#d7eaff] text-[#1f4f8f] p-8 rounded-lg shadow border border-blue-200 text-center">
            <p className="text-4xl font-bold">{stats.citasHoy}</p>
            <p className="mt-2 text-lg font-medium">Citas Hoy</p>
          </div>

          {/* Citas Pendientes */}
          <div className="bg-[#fff5cc] text-[#7a5d00] p-8 rounded-lg shadow border border-yellow-200 text-center">
            <p className="text-4xl font-bold">{stats.citasPendientes}</p>
            <p className="mt-2 text-lg font-medium">Citas Pendientes</p>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN “ACCESOS RÁPIDOS” ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
          <Link
            to="/psych/manage-patients"
            className="block bg-[#f9e5fb] hover:bg-[#f3d0f4] text-[#8e44ad] font-medium rounded-lg p-10 text-center transition"
          >
            <span className="text-xl sm:text-2xl font-semibold">Gestionar Pacientes</span>
          </Link>
          <Link
            to="/psych/manage-appointments"
            className="block bg-[#fde8e6] hover:bg-[#fbd1cc] text-[#c0392b] font-medium rounded-lg p-10 text-center transition"
          >
            <span className="text-xl sm:text-2xl font-semibold">Gestionar Citas</span>
          </Link>
        </div>
      </section>

      {/* Empujar footer hacia abajo si falta espacio */}
      <div className="flex-grow"></div>
    </div>
  );
}
