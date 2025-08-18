// src/pages/AuthChoice.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthChoice() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /* ============= PSICOLOGOS ============= */

  const [stats1, setStats1] = useState({
    pacientesActivos: 0,
    citasHoy: 0,
    citasPendientes: 0,
  });

  useEffect(() => {
    // Simula fetch
    setTimeout(() => {
      setStats1({ pacientesActivos: 24, citasHoy: 3, citasPendientes: 5 });
    }, 300);
  }, []);
  /* ============= PSICOLOGOS ============= */

  /* ============= Nombres y Apellidos ============= */
  const rol = (user?.rol || '').toUpperCase();
  const isGuest = !user;
  const isPaciente = user && rol === 'PACIENTE';
  const isPsico = user && rol === 'PSICOLOGO';
  const isAdmin = user && rol === 'ADMIN';

  const displayName = user?.nombres || user?.apellidos || '';  // ya lo tienes

  /* ============= Nombres y Apellidos ============= */

  /* ============= Simular estadísticas del paciente ============= */
  const stats = [
    { icon: '📝', label: 'Tests Realizados', value: 3, bg: 'bg-green-50', text: 'text-green-700' },
    { icon: '📅', label: 'Próxima Cita', value: '2025-06-10', bg: 'bg-blue-50', text: 'text-blue-700' },
    { icon: '📚', label: 'Recursos Accedidos', value: 5, bg: 'bg-yellow-50', text: 'text-yellow-700' },
  ];
  /* ============= Simular estadísticas del paciente ============= */

  /* ============= SERVICIOS ============= */
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
  /* ============= SERVICIOS ============= */

  /* ============= PSICOLOGO ============= */

  const cards = [
    {
      label: 'Pacientes Activos',
      value: stats1.pacientesActivos,
      icon: '👥',
      bg: 'bg-green-50',
      text: 'text-green-700',
    },
    {
      label: 'Citas Hoy',
      value: stats1.citasHoy,
      icon: '📅',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
    },
    {
      label: 'Pendientes',
      value: stats1.citasPendientes,
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


  /* ============= PSICOLOGO ============= */

  return (
    <div className="min-h-screen flex flex-col bg-loginBg">
      {/* Navbar */}
      {/* =============================================== PARA NO LOGUEADOS =============================================== */}
      {/* =============================================== Bienvenido =============================================== */}
      {/* HERO */}
      {isGuest && (    // Cuando el Usuario esta NO LOGUEADO
        <header className="bg-gradient-to-r from-primaryBtn/60 to-formBtn/60 text-white py-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6">
            {/* Texto */}
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-5xl font-black tracking-tight animate-fade-in">
                ¡Bienvenido a tu espacio de bienestar!
              </h1>
              <p className="text-lg text-gray-700 animate-fade-in delay-200">
                Soy <strong>Blue</strong>, tu guía. Aquí encontrarás herramientas, tests y recursos
                para acompañarte en tu proceso de salud mental. ¿Listx para comenzar?
              </p>

              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 animate-fade-in delay-400 items-center ">
                <Link
                  to="/login"
                  className="inline-block px-6 py-3 bg-white text-primaryBtn font-semibold rounded-full shadow hover:shadow-lg transition text-center"
                >
                  ✏️ Realizar Test Psicométrico
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 bg-white text-formBtn font-semibold rounded-full shadow hover:shadow-lg transition text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l4-4m-4 4l4 4m6-8v8" />
                  </svg>
                  Iniciar Sesión
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
      )}
      {/* =============================================== Bienvenido =============================================== */}

      {/* =============================================== Nosotros =============================================== */}
      {isGuest && (    // Cuando el Usuario esta NO LOGUEADO
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">

            {/* Imagen */}
            {/* Imagen de la sección Nosotros */}
            <div className="lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
              <img
                src="/images/Nosotros.png" // asegúrate que este path sea correcto
                alt="Nuestro equipo"
                className="w-64 h-auto md:w-80"
              />
            </div>

            {/* Texto Nosotros */}
            <div className="lg:w-1/2 lg:pl-12">
              <h3 className="text-3xl font-semibold text-primaryText mb-4">
                Nosotros
              </h3>
              <p className="text-gray-700 mb-6 max-w-prose">
                En el <strong>Centro Psicológico CEM</strong> trabajamos con un grupo de
                psicólogos clínicos colegiados, logopedas y profesionales especializados
                en trastornos del neurodesarrollo. Estamos calificados para brindar una
                excelente evaluación, diagnóstico y tratamiento psicológico. Nuestros
                profesionales cuentan con más de 10 años de experiencia acompañando procesos
                de bienestar emocional.
              </p>
              <Link
                to="/nosotros"
                className="px-5 py-2 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
              >
                Conocer más
              </Link>
            </div>
          </div>
        </section>
      )}
      {/* =============================================== Nosotros =============================================== */}
      {/* =============================================== PARA NO LOGUEADOS =============================================== */}


      {/* =============================================== PARA PACIENTES =============================================== */}
      {/* =============================================== Bienvenido =============================================== */}
      {/* HERO */}
      {isPaciente && (    // Cuando el Usuario esta NO LOGUEADO
        <header className="bg-gradient-to-r from-primaryBtn/60 to-formBtn/60 text-white py-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6">
            {/* Texto */}
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-5xl font-black tracking-tight animate-fade-in">
                ¡Bienvenido {displayName} a tu espacio de bienestar!
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
      )}
      {/* =============================================== Bienvenido =============================================== */}

      {/* =============================================== Estadisticas Personales =============================================== */}
      {/* ESTADÍSTICAS PERSONALES */}
      {isPaciente && (    // Cuando el Usuario esta NO LOGUEADO

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
      )}
      {/* =============================================== Estadisticas Personales =============================================== */}
      {/* =============================================== Accesos Rapidos =============================================== */}

      {/* ACCESOS RÁPIDOS */}
      {isPaciente && (    // Cuando el Usuario esta NO LOGUEADO

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
      )}
      {/* =============================================== Accesos Rapidos =============================================== */}
      {/* =============================================== PARA PACIENTES =============================================== */}

      {/* =============================================== PARA PSICOLOGOS =============================================== */}
      {/* =============================================== Bienvenido =============================================== */}

      {/* HERO */}
      {isPsico && (    // Cuando el Usuario esta NO LOGUEADO

        <header className="bg-gradient-to-r from-primaryBtn/60 to-formBtn/60 text-white py-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6">
            <div className="lg:w-1/2 space-y-6">
              {/* Título principal con animación y estilo 
            <h1 className="text-5xl font-black tracking-tight animate-fade-in">
              ¡Hola, Dra. {user?.nombre || 'Psicóloga'}!
            </h1>*/}

              <h1 className="text-5xl font-black tracking-tight animate-fade-in">
                ¡Hola, Dr(a). {displayName}!
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
      )}

      {/* ESTADÍSTICAS */}
      {isPsico && (    // Cuando el Usuario esta NO LOGUEADO

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
      )}


      {/* ACCESOS + TESTIMONIAL */}
      {isPsico && (    // Cuando el Usuario esta NO LOGUEADO

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
      )}
      {/* =============================================== Bienvenido =============================================== */}
      {/* =============================================== PARA PSICOLOGOS =============================================== */}


      {/* =============================================== Servicios =============================================== */}
      {(isGuest || isPaciente) && (
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
      )}
      {/* =============================================== Servicios =============================================== */}
    </div>
  );
}
