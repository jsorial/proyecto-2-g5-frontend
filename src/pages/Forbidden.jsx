// src/pages/Forbidden.jsx
import React from 'react';
import AcceDenSection from '../components/ui/AcceDenSection';
import { XCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

export default function Forbidden() {
  return (
    <div className="relative flex-grow">
      {/* 1. Fondo fijo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/fondo.png')" }}
      />
      {/* 2. Overlay semitransparente */}
      <div className="absolute inset-0 bg-usmp-maroon/60" />

      {/* 3. Contenido centrado */}
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-8">
        <div className="w-full max-w-xl bg-white bg-opacity-90 rounded-2xl shadow-xl p-8">
          <AcceDenSection title="Acceso Denegado">
            <div className="flex flex-col items-center space-y-6">
              <XCircleIcon className="w-16 h-16 text-usmp-maroon" />
              <h2 className="text-2xl font-extrabold text-usmp-maroon">
                403 – No tienes permiso
              </h2>
              <p className="text-center text-gray-700">
                Estás autenticado, pero tu rol no te permite ver esta sección.
              </p>
              <Link
                to="/"
                className="mt-4 px-6 py-2 bg-usmp-maroon text-white rounded-lg hover:bg-usmp-maroon-dark transition"
              >
                Volver al panel
              </Link>
            </div>
          </AcceDenSection>
        </div>
      </div>
    </div>
  );
}
