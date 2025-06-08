// src/pages/AuthChoice.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function AuthChoice() {
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
      {/* Navbar */}


      {/* Hero */}
      <div className="flex flex-col-reverse lg:flex-row items-center max-w-7xl mx-auto flex-1 px-6 py-16">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-primaryText mb-4">
            ¡Bienvenido a tu espacio de bienestar!
          </h1>
          <p className="text-gray-700 mb-8 max-w-md mx-auto lg:mx-0">
            Soy <strong>Blue</strong>, tu guía. Aquí encontrarás herramientas, tests y recursos
            para acompañarte en tu proceso de salud mental. ¿Listx para comenzar?
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
            >
              Realizar Test Psicométrico
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-transparent border-2 border-primaryBtn text-primaryBtn font-medium rounded-lg hover:bg-primaryBtn hover:text-white transition"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
          <img src="/images/Blue.png" alt="Blue tu guía" className="w-64 md:w-80 animate-bounce-slow" />
        </div>
      </div>

      {/* Nosotros */}
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


      {/* Servicios */}
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
