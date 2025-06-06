// src/pages/AuthChoice.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthChoice() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Bienvenido(a) a CEM Salud Mental
          </h2>
          <p className="text-gray-600 mb-8">
            Por favor, selecciona tu rol para iniciar sesión:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/login?role=patient"
              className="flex-1 px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
            >
              Ingresar como Paciente
            </Link>
            <Link
              to="/login?role=psychologist"
              className="flex-1 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
            >
              Ingresar como Psicóloga
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
