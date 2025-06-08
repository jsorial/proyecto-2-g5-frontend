// src/pages/AuthChoice.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthChoice() {
  // Simular estadísticas del paciente  
  const stats = [
    { icon: '📝', label: 'Tests Realizados', value: 3, bg: 'bg-formBtn/20', text: 'text-formBtn' },
    { icon: '📅', label: 'Próxima Cita', value: '2025-06-10', bg: 'bg-primaryBtn/20', text: 'text-primaryBtn' },
    { icon: '📚', label: 'Recursos Accedidos', value: 5, bg: 'bg-stateActive/20', text: 'text-stateActive' },
  ];

  const services = [
    {
      icon: '/images/servicio1.png',
      title: 'Evaluación Psicológica Integral',
      desc: 'Evaluación de inteligencia, atención, personalidad, emocional, social y familiar según motivo de consulta.',
    },
    {
      icon: '/images/servicio2.png',
      title: 'Terapia de Habla, Lenguaje y Comunicación',
      desc: 'Evaluamos fonología, morfología, gramática, expresión y síntesis de vocabulario, habilidades lingüísticas.',
    },
    {
      icon: '/images/servicio3.png',
      title: 'Terapia Psicológica',
      desc: 'Brindamos tratamiento para trastornos y problemas psicológicos, mejorando el estado emocional.',
    },
    {
      icon: '/images/servicio4.png',
      title: 'Terapia de Pareja y Familia',
      desc: 'Terapia centrada en mejorar comunicación, convivencia y conexión emocional en la familia.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-loginBg">
      {/* HERO */}
      <header className="bg-gradient-to-r from-primaryBtn/60 to-formBtn/60 text-white py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6">
          {/* Texto */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl font-black tracking-tight animate-fade-in">
              ¡Bienvenido Jose Garcia a tu espacio de bienestar!
            </h1>
            <p className="text-lg text-gray-700 animate-fade-in delay-200">
              Soy <strong>Blue</strong>, tu guía virtual. Aquí puedes realizar tu test,
              revisar citas y acceder a recursos personalizados para tu salud mental.
            </p>
            <div className="space-x-4 animate-fade-in delay-400">
              <Link
                to="/patient/test"
                className="inline-block px-6 py-3 bg-white text-primaryBtn font-semibold rounded-full shadow hover:shadow-lg transition"
              >
                ✏️ Hacer Test Psicométrico
              </Link>
              <Link
                to="/patient/resources"
                className="inline-block px-6 py-3 bg-white text-formBtn font-semibold rounded-full shadow hover:shadow-lg transition"
              >
                📚 Ver Recursos
              </Link>
            </div>
          </div>
          {/* Imagen */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
            <img
              src="/images/Blue.png"
              alt="Blue, tu guía"
              className="w-64 md:w-80 animate-bounce-slow"
            />
          </div>
        </div>
      </header>

      {/* ESTADÍSTICAS PERSONALES */}
      <section className="py-12 -mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((c, idx) => (
            <div
              key={idx}
              className={`${c.bg} shadow-lg rounded-2xl p-6 flex items-center space-x-4 transform hover:-translate-y-1 transition`}
            >
              <div className="text-4xl">{c.icon}</div>
              <div>
                <p className={`text-3xl font-bold ${c.text}`}>{c.value}</p>
                <p className="text-gray-700">{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESOS RÁPIDOS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-formTitle">Accesos Rápidos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                to="/patient/appointments"
                className="flex items-center p-4 bg-formBtn text-white rounded-xl hover:bg-primaryTextActive transition"
              >
                <span className="text-2xl mr-3">📅</span>
                <span className="font-medium">Mis Citas</span>
              </Link>
              <Link
                to="/patient/progress"
                className="flex items-center p-4 bg-primaryBtn text-white rounded-xl hover:bg-primaryTextActive transition"
              >
                <span className="text-2xl mr-3">📈</span>
                <span className="font-medium">Mi Progreso</span>
              </Link>
              {/* <Link
                to="/patient/resources"
                className="flex items-center p-4 bg-stateActive text-white rounded-xl hover:bg-primaryTextActive transition"
              >
                <span className="text-2xl mr-3">📖</span>
                <span className="font-medium">Recursos</span>
              </Link>
             <Link
                to="/patient/history"
                className="flex items-center p-4 bg-navbarUnderline text-white rounded-xl hover:bg-primaryTextActive transition"
              >
                <span className="text-2xl mr-3">🕘</span>
                <span className="font-medium">Historial de Tests</span>
              </Link>*/  }
            </div>
          </div>

          {/* Testimonial / Mensaje de ánimo */}
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
              “Cada paso que das hacia tu bienestar cuenta. ¡Sigue adelante!”
            </blockquote>
            <figcaption className="flex items-center">
              <img
                src="/images/Blue.png"
                alt="Blue"
                className="w-12 h-12 rounded-full mr-4 border-2 border-formBtn"
              />
              <div>
                <p className="font-semibold">Blue, tu guía</p>
                <p className="text-sm text-gray-600">Centro Psicológico CEM</p>
              </div>
            </figcaption>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-loginBg py-12">
        <h3 className="text-3xl font-semibold text-primaryText text-center mb-8">Nuestros Servicios</h3>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white border-2 border-primaryBtn rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="bg-navbarBg rounded-full p-4 mb-4">
                <img src={s.icon} alt={s.title} className="w-12 h-12" />
              </div>
              <h4 className="text-primaryText text-lg font-semibold mb-2">{s.title}</h4>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
