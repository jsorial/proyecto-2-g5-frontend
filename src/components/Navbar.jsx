// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Rutas que verá un paciente
  const patientLinks = [
    { to: '/patient/home', label: 'Inicio' },
    { to: '/patient/profile', label: 'Perfil' },
    { to: '/patient/appointments', label: 'Mis Citas' },
    { to: '/patient/progress', label: 'Mi Progreso' },
    { to: '/patient/test', label: 'Test Psicométrico' },
    { to: '/patient/resources', label: 'Recursos' },
  ];

  // Rutas que verá la psicóloga
  const psychLinks = [
    { to: '/psych/home', label: 'Inicio' },
    { to: '/psych/manage-patients', label: 'Pacientes' },
    { to: '/psych/manage-appointments', label: 'Citas' },
    { to: '/psych/progress', label: 'Progreso Pacientes' },
  ];

  return (
    <>
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
              {!user && (
                <>
                  <Link
                    to="/"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition ${
                      isActive('/')
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-700 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    Inicio
                  </Link>
                  <Link
                    to="/login"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition ${
                      isActive('/login')
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-700 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    Iniciar Sesión
                  </Link>
                </>
              )}

              {user?.role === 'patient' &&
                patientLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition ${
                      isActive(link.to)
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-700 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

              {user?.role === 'psychologist' &&
                psychLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition ${
                      isActive(link.to)
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-700 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

              {user && (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:border-red-500 hover:text-red-600 transition"
                >
                  Cerrar Sesión
                </button>
              )}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
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
              {!user && (
                <>
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition ${
                      isActive('/')
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    Inicio
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition ${
                      isActive('/login')
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    Iniciar Sesión
                  </Link>
                </>
              )}

              {user?.role === 'patient' &&
                patientLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition ${
                      isActive(link.to)
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

              {user?.role === 'psychologist' &&
                psychLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition ${
                      isActive(link.to)
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

              {user && (
                <button
                  onClick={() => {
                    setShowLogoutModal(true);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-red-500 hover:text-red-600 transition"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Modal de confirmación de cierre de sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
            {/* Botón de cerrar modal */}
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-semibold"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              ¿Estás seguro que desea cerrar sesión?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  logout();
                  setShowLogoutModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Sí
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
