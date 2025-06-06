// src/pages/Index.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Contenedor principal centrado */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          {/* Sección de bienvenida */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
            ¡Bienvenido(a) al Centro Psicológico CEM!
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Estamos muy contentos de acompañarte en tu camino hacia una mejor salud mental. 
            Aquí podrás realizar un breve Test Psicométrico para evaluar tu nivel de 
            ansiedad y estrés, acceder a recursos útiles y gestionar tu perfil personal.
          </p>

          {/* Botón principal: Ir al Test Psicométrico */}
          <div className="flex justify-center mb-8">
            <Link
              to="/consentimiento"
              className="inline-block px-8 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition"
            >
              Comenzar Test Psicométrico
            </Link>
          </div>

          {/* Enlaces secundarios */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/recursos"
              className="w-full sm:w-auto text-center px-6 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition"
            >
              Recursos de Autocuidado
            </Link>
            <Link
              to="/perfil"
              className="w-full sm:w-auto text-center px-6 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition"
            >
              Mi Perfil
            </Link>
          </div>
        </div>
      </div>

      {/* Footer simplificado (en caso de que quieras algo distinto del Footer global) */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-3xl mx-auto text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} CEM Salud Mental. <br className="sm:hidden" /> 
          Si necesitas ayuda inmediata, contáctanos al <a href="tel:+123456789" className="text-green-600 hover:underline">+1 (234) 567-89</a>.
        </div>
      </footer>
    </div>
  );
}
