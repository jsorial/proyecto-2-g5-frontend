// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Función para cerrar el menú móvil cuando se hace clic en un enlace
  const closeMenu = () => setIsOpen(false);

  // Determinar si una ruta está “activa” para marcarla
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Nombre */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-semibold text-green-600 hover:text-green-700 transition"
            >
              CEM Salud Mental
            </Link>
          </div>

          {/* Menú de escritorio */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/"
              className={`
                inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition 
                ${isActive('/') 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-700 hover:border-green-500 hover:text-green-600'}
              `}
            >
              Inicio
            </Link>

            <Link
              to="/consentimiento"
              className={`
                inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition 
                ${isActive('/consentimiento') 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-700 hover:border-green-500 hover:text-green-600'}
              `}
            >
              Test Psicométrico
            </Link>

            <Link
              to="/recursos"
              className={`
                inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition 
                ${isActive('/recursos') 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-700 hover:border-green-500 hover:text-green-600'}
              `}
            >
              Recursos
            </Link>

            <Link
              to="/perfil"
              className={`
                inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition 
                ${isActive('/perfil') 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-700 hover:border-green-500 hover:text-green-600'}
              `}
            >
              Perfil
            </Link>

            {/* Ejemplo de “Cerrar Sesión” */}
            <button
              onClick={() => {
                // Aquí iría tu lógica de logout
                alert('Has cerrado sesión.');
              }}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:border-red-500 hover:text-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Botón móvil */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-300"
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil colapsable */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition 
                ${isActive('/') 
                  ? 'bg-green-50 border-green-500 text-green-700' 
                  : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-green-500 hover:text-green-600'}
              `}
            >
              Inicio
            </Link>

            <Link
              to="/consentimiento"
              onClick={closeMenu}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition 
                ${isActive('/consentimiento') 
                  ? 'bg-green-50 border-green-500 text-green-700' 
                  : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-green-500 hover:text-green-600'}
              `}
            >
              Test Psicométrico
            </Link>

            <Link
              to="/recursos"
              onClick={closeMenu}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition 
                ${isActive('/recursos') 
                  ? 'bg-green-50 border-green-500 text-green-700' 
                  : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-green-500 hover:text-green-600'}
              `}
            >
              Recursos
            </Link>

            <Link
              to="/perfil"
              onClick={closeMenu}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition 
                ${isActive('/perfil') 
                  ? 'bg-green-50 border-green-500 text-green-700' 
                  : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-green-500 hover:text-green-600'}
              `}
            >
              Perfil
            </Link>

            <button
              onClick={() => {
                // Lógica de logout
                alert('Has cerrado sesión.');
                closeMenu();
              }}
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-red-500 hover:text-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
