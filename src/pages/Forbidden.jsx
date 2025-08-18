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
        style={{ backgroundImage: "url('/images/Blue.png')" }}
      />
      {/* 2. Overlay semitransparente */}
      <div className="absolute inset-0 bg-primaryBtn/60" />

      {/* 3. Contenido centrado */}
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-8">
        <div className="w-full max-w-xl bg-white bg-opacity-90 rounded-2xl shadow-xl p-8">
          <AcceDenSection title="Acceso Denegado">
            <div className="relative flex flex-col items-center space-y-6">
              {/*   <XCircleIcon className="w-16 h-16 text-primaryTextActive" />*/}
              <h2 className="text-2xl font-extrabold text-primaryBtn">
                403 – No tienes permiso
              </h2>

              {/* Botón “X” para cerrar y volver atrás */}
              <button
                type="button"
                onClick={() => navigate('/')}
                className="relative top right-4 bg-white rounded-full p-1 hover:bg-gray-100 transition"
                aria-label="Cerrar"    >
                <img
                  src="/images/Equis_de_cuestionarios.png"
                  alt="Cerrar"
                  className="h-10 w-10" />
              </button>
              <p className="text-center text-gray-700">
                Estás autenticado, pero tu rol no te permite ver esta sección.
              </p>
              <Link
                to="/"
                className="mt-4 px-6 py-2 bg-primaryBtn text-white rounded-lg hover:bg-primaryTextActive transition"
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
