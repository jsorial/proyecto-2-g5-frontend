// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-18rem)] bg-loginBg items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Imagen decorativa */}
      <div className="mb-4">
        <img
          src="/images/Blue.png"
          alt="Ilustración de apoyo emocional"
          className="w-40 h-auto"
        />
      </div>

      {/* Código de error */}
      <h1 className="text-5xl font-bold text-primaryText mb-1">404</h1>
      <p className="text-lg text-primaryText mb-3">Página no encontrada</p>
      <p className="text-gray-600 mb-6 text-center max-w-sm">
        Lo sentimos, no pudimos encontrar la ruta que buscas. En el Centro Psicológico CEM
        estamos para acompañarte en tu bienestar emocional.
      </p>

      {/* Botones de acción */}
      <div className="flex space-x-3">
        <Link
          to="/"
          className="px-5 py-2 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
        >
          Volver al Inicio
        </Link>
        <Link
          to="/resources"
          className="px-5 py-2 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
        >
          Ver Recursos
        </Link>
      </div>
    </div>
  );
}
