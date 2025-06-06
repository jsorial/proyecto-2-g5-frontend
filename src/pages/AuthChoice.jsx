// src/pages/AuthChoice.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthChoice() {
  return (
    <div className="flex flex-col bg-loginBg">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-25rem)]">
        {/* Izquierda: Imagen de Blue (guía) */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src="/images/Blue.png"
            alt="Blue, tu guía"
            className="w-64 h-auto md:w-80"
          />
        </div>

        {/* Derecha: Texto de bienvenida y botón */}
        <div className="md:w-1/2 flex flex-col items-start justify-center px-6 md:px-12 lg:px-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primaryText mb-4">
            ¡Bienvenidx!
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-primaryText mb-6">
            Centro Psicológico CEM
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg">
            Soy Blue, tu guía en esta experiencia. Estoy aquí para acompañarte paso a paso.
            ¿Listx para descubrir más sobre ti? Presiona el botón y empecemos con el test psicométrico.
          </p>
          <Link
            to="/login?role=patient"
            className="px-6 py-3 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition mb-8"
          >
            Test Psicométrico
          </Link>
        </div>
      </div>

      {/* Nosotros Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col lg:flex-row items-center">
          {/* Imagen de la sección Nosotros */}
          <div className="lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
            <img
              src="/images/Nosotros.png"
              alt="Nosotros"
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
      </div>

      {/* Nuestros Servicios Section */}
      <div className="bg-loginBg py-12">
        <h3 className="text-3xl font-semibold text-primaryText text-center mb-8">
          Nuestros Servicios
        </h3>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Servicio 1 */}
          <div className="bg-white border-2 border-primaryBtn rounded-lg p-6 flex flex-col items-center">
            <img
              src="/images/servicio1.png"
              alt="Evaluación Psicológica Integral"
              className="w-16 h-16 mb-4"
            />
            <h4 className="text-center text-lg font-semibold text-primaryText">
              Evaluación Psicológica Integral
            </h4>
          </div>

          {/* Servicio 2 */}
          <div className="bg-white border-2 border-primaryBtn rounded-lg p-6 flex flex-col items-center">
            <img
              src="/images/servicio2.png"
              alt="Terapia de Habla, Lenguaje y Comunicación"
              className="w-16 h-16 mb-4"
            />
            <h4 className="text-center text-lg font-semibold text-primaryText">
              Terapia de Habla, Lenguaje y Comunicación
            </h4>
          </div>

          {/* Servicio 3 */}
          <div className="bg-white border-2 border-primaryBtn rounded-lg p-6 flex flex-col items-center">
            <img
              src="/images/servicio3.png"
              alt="Terapia Psicológica"
              className="w-16 h-16 mb-4"
            />
            <h4 className="text-center text-lg font-semibold text-primaryText">
              Terapia Psicológica
            </h4>
          </div>

          {/* Servicio 4 */}
          <div className="bg-white border-2 border-primaryBtn rounded-lg p-6 flex flex-col items-center">
            <img
              src="/images/servicio4.png"
              alt="Terapia de Pareja y Familia"
              className="w-16 h-16 mb-4"
            />
            <h4 className="text-center text-lg font-semibold text-primaryText">
              Terapia de Pareja y Familia
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
