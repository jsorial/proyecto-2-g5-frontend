// src/pages/Psychologist/PsychHome.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function PsychHome() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    pacientesActivos: 0,
    citasHoy: 0,
    citasPendientes: 0,
  });

  useEffect(() => {
    // Simula fetch
    setTimeout(() => {
      setStats({ pacientesActivos: 24, citasHoy: 3, citasPendientes: 5 });
    }, 300);
  }, []);

  const cards = [
    {
      label: 'Pacientes Activos',
      value: stats.pacientesActivos,
      icon: '👥',
      bg: 'bg-green-50',
      text: 'text-green-700',
    },
    {
      label: 'Citas Hoy',
      value: stats.citasHoy,
      icon: '📅',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
    },
    {
      label: 'Pendientes',
      value: stats.citasPendientes,
      icon: '⏳',
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
    },
  ];

  const shortcuts = [
    { to: '/psych/manage-patients', icon: '👥', label: 'Pacientes' },
    { to: '/psych/manage-appointments', icon: '📅', label: 'Citas' },
    { to: '/psych/test-overview', icon: '📊', label: 'Resultados' },
    //{ to: '/psych/resources', icon: '📚', label: 'Recursos' },
  ];

  return (
    <div className="min-h-screen bg-loginBg flex flex-col">
      {/* HERO */}
      <header className="bg-gradient-to-r from-primaryBtn/60 to-formBtn/60 text-white py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6">
          <div className="lg:w-1/2 space-y-6">
            {/* Título principal con animación y estilo 
            <h1 className="text-5xl font-black tracking-tight animate-fade-in">
              ¡Hola, Dra. {user?.nombre || 'Psicóloga'}!
            </h1>*/}

            <h1 className="text-5xl font-black tracking-tight animate-fade-in">
              ¡Hola, Dra. Carina Neyra Corahua!
            </h1>

            {/* Mensaje secundario */}
            <p className="text-lg text-gray-700 animate-fade-in delay-200">
              Soy <strong>Blue</strong>, tu asistente virtual en el CEM. Estoy aquí para ayudarte a:
            </p>

            {/* Lista de puntos clave */}
            <ul className="list-disc list-inside space-y-2 text-gray-600 animate-fade-in delay-400">
              <li>Gestionar fácilmente a tus pacientes activos.</li>
              <li>Revisar, agendar y organizar tus citas.</li>
              <li>Visualizar resultados psicométricos de forma clara y dinámica.</li>
              <li>Acceder a recursos y guías útiles para tus sesiones clínicas.</li>
            </ul>
            <div className="space-x-4 animate-fade-in delay-400">
              <Link
                to="/psych/manage-patients"
                className="inline-block px-6 py-3 bg-white text-primaryBtn font-semibold rounded-full shadow hover:shadow-lg transition"
              >
                👥 Pacientes
              </Link>
              <Link
                to="/psych/manage-appointments"
                className="inline-block px-6 py-3 bg-white text-formBtn font-semibold rounded-full shadow hover:shadow-lg transition"
              >
                📅 Citas
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
            <img
              src="/images/Blue.png"
              alt="Blue guía"
              className="w-64 md:w-80 animate-bounce-slow"
            />
          </div>
        </div>
      </header>

      {/* ESTADÍSTICAS */}
      <section className="py-12 -mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className={`${c.bg} shadow-lg rounded-2xl p-6 flex items-center space-x-4 transform hover:-translate-y-1 transition`}
            >
              <div className="text-4xl">{c.icon}</div>
              <div>
                <p className="text-3xl font-bold">{c.value}</p>
                <p className={`${c.text}`}>{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESOS + TESTIMONIAL */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Accesos */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-formTitle">Accesos Rápidos</h2>
            <div className="grid grid-cols-2 gap-6">
              {shortcuts.map((s, i) => (
                <Link
                  key={i}
                  to={s.to}
                  className="flex items-center p-4 bg-formBtn text-white rounded-xl hover:bg-primaryTextActive transition"
                >
                  <span className="text-2xl mr-3">{s.icon}</span>
                  <span className="font-medium">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative bg-loginBg p-10 rounded-3xl shadow-xl">
            <div className="absolute -top-6 right-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-formBtn"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 13v6H2v-6h16zm0-2H2V7h16v4zM4 9h4v2H4V9zm6 0h4v2h-4V9z" />
              </svg>
            </div>
            <blockquote className="italic text-gray-800 mb-6">
              “Desde que integramos estas herramientas, mis pacientes avanzan más
              rápido y yo gano tiempo para centrarme en lo clínico. ¡Super útil!”
            </blockquote>
            <figcaption className="flex items-center">
              <img
                src="/images/Blue.png"
                alt="Psicóloga"
                className="w-12 h-12 rounded-full mr-4 border-2 border-formBtn"
              />
              <div>
                <p className="font-semibold">Dra. Carina Neyra Corahua</p>
                <p className="text-sm text-gray-600">Psicóloga Clínica</p>
              </div>
            </figcaption>
          </div>
        </div>
      </section>
    </div>
  );
}
