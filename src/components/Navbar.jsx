// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Verifica si la ruta actual coincide con "path"
  const isActive = (path) => location.pathname === path;

  // Links para paciente
  const patientLinks = [
    { to: '/patient/home', label: 'Inicio' },
    { to: '/patient/profile', label: 'Perfil' },
    { to: '/patient/appointments', label: 'Mis Citas' },
    { to: '/patient/progress', label: 'Mi Progreso' },
    { to: '/patient/test', label: 'Test Psicométrico' },
    { to: '/patient/resources', label: 'Recursos' },
  ];

  // Links para psicóloga
  const psychLinks = [
    { to: '/psych/home', label: 'Inicio' },
    { to: '/psych/manage-patients', label: 'Pacientes' },
    { to: '/psych/manage-appointments', label: 'Citas' },
    { to: '/psych/progress', label: 'Progreso Pacientes' },
  ];

  return (
    <>
      <nav className="bg-navbarBg border-b-2 border-navbarUnderline shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between h-20 items-center">
            {/* Logo y texto */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  src="/images/Logo_CPC.png"
                  alt="Centro Psicológico CEM"
                  className="h-12 w-auto"
                />
              </Link>
              <span className="ml-3 text-2xl sm:text-3xl font-bold text-primaryText">
                Centro Psicológico CEM
              </span>
            </div>

            {/* Menú de escritorio (oculto < sm) */}
            <div className="hidden sm:flex sm:space-x-8 sm:items-center">
              {!user && (
                <>
                  {/* Contenedor “Inicio” con hover de escala */}
                  <div className="relative group transform transition duration-150 hover:scale-95">
                    <Link
                      to="/"
                      className="text-lg font-normal text-primaryText px-2"
                    >
                      Inicio
                    </Link>
                    <span
                      className={`
                        absolute bottom-0 left-0 h-0.5 w-full bg-primaryText
                        transform transition-transform duration-200
                        ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </div>

                  {/* Contenedor “Recursos” con hover de escala */}
                  <div className="relative group transform transition duration-150 hover:scale-95">
                    <Link
                      to="/resources"
                      className="text-lg font-normal text-primaryText px-2"
                    >
                      Recursos
                    </Link>
                    <span
                      className={`
                        absolute bottom-0 left-0 h-0.5 w-full bg-primaryText
                        transform transition-transform duration-200
                        ${isActive('/resources') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </div>

                  {/* Contenedor “Etc.” con hover de escala */}
                  <div className="relative group transform transition duration-150 hover:scale-95">
                    <Link
                      to="/etc"
                      className="text-lg font-normal text-primaryText px-2"
                    >
                      Etc.
                    </Link>
                    <span
                      className={`
                        absolute bottom-0 left-0 h-0.5 w-full bg-primaryText
                        transform transition-transform duration-200
                        ${isActive('/etc') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </div>

                  {/* Ícono de login (hover:scale-95) */}
                  <Link to="/login" className="ml-6 transform transition duration-150 hover:scale-95">
                    <img
                      src="/images/logo_inicio_sesion.png"
                      alt="Iniciar Sesión"
                      className="h-8 w-8"
                    />
                  </Link>
                </>
              )}

              {user?.role === 'patient' &&
                patientLinks.map((link) => (
                  <div
                    key={link.to}
                    className="relative group transform transition duration-150 hover:scale-95"
                  >
                    <Link
                      to={link.to}
                      className="text-lg font-normal text-primaryText px-2"
                    >
                      {link.label}
                    </Link>
                    <span
                      className={`
                        absolute bottom-0 left-0 h-0.5 w-full bg-primaryText
                        transform transition-transform duration-200
                        ${isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </div>
                ))}

              {user?.role === 'psychologist' &&
                psychLinks.map((link) => (
                  <div
                    key={link.to}
                    className="relative group transform transition duration-150 hover:scale-95"
                  >
                    <Link
                      to={link.to}
                      className="text-lg font-normal text-primaryText px-2"
                    >
                      {link.label}
                    </Link>
                    <span
                      className={`
                        absolute bottom-0 left-0 h-0.5 w-full bg-primaryText
                        transform transition-transform duration-200
                        ${isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </div>
                ))}

              {user && (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="ml-6 transform transition duration-150 hover:scale-95"
                  aria-label="Cerrar Sesión"
                >
                  <img
                    src="/images/logo_usuario.png"
                    alt="Usuario"
                    className="h-8 w-8"
                  />
                </button>
              )}
            </div>

            {/* Botón móvil (visible < sm) */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primaryText"
                aria-label="Abrir menú"
              >
                {isOpen ? (
                  <svg
                    className="h-8 w-8 text-primaryText"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                    className="h-8 w-8 text-primaryText"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
          <div className="sm:hidden border-t border-navbarUnderline bg-navbarBg">
            <div className="pt-4 pb-5 space-y-2">
              {!user && (
                <>
                  <div className="relative group transform transition duration-150 hover:scale-95">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="block pl-4 py-2 text-lg font-normal text-primaryText"
                    >
                      Inicio
                    </Link>
                    <span
                      className={`
                        absolute bottom-0 left-4 h-0.5 w-[calc(100%-2rem)] bg-primaryText
                        transform transition-transform duration-200
                        ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </div>

                  <div className="relative group transform transition duration-150 hover:scale-95">
                    <Link
                      to="/resources"
                      onClick={() => setIsOpen(false)}
                      className="block pl-4 py-2 text-lg font-normal text-primaryText"
                    >
                      Recursos
                    </Link>
                    <span
                      className={`
                        absolute bottom-0 left-4 h-0.5 w-[calc(100%-2rem)] bg-primaryText
                        transform transition-transform duration-200
                        ${isActive('/resources') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </div>

                  <div className="relative group transform transition duration-150 hover:scale-95">
                    <Link
                      to="/etc"
                      onClick={() => setIsOpen(false)}
                      className="block pl-4 py-2 text-lg font-normal text-primaryText"
                    >
                      Etc.
                    </Link>
                    <span
                      className={`
                        absolute bottom-0 left-4 h-0.5 w-[calc(100%-2rem)] bg-primaryText
                        transform transition-transform duration-200
                        ${isActive('/etc') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      // Redirige a /login
                    }}
                    className="flex flex-col items-center pl-4 py-2 transform transition duration-150 hover:scale-95"
                  >
                    <img
                      src="/images/logo_inicio_sesion.png"
                      alt="Iniciar Sesión"
                      className="h-8 w-8 mb-1"
                    />
                    <span className="text-primaryText text-lg font-normal">
                      Iniciar Sesión
                    </span>
                  </button>
                </>
              )}

              {user?.role === 'patient' &&
                patientLinks.map((link) => (
                  <div key={link.to} className="relative group transform transition duration-150 hover:scale-95">
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="block pl-4 py-2 text-lg font-normal text-primaryText"
                    >
                      {link.label}
                    </Link>
                    <span
                      className={`
                        absolute bottom-0 left-4 h-0.5 w-[calc(100%-2rem)] bg-primaryText
                        transform transition-transform duration-200
                        ${isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </div>
                ))}

              {user?.role === 'psychologist' &&
                psychLinks.map((link) => (
                  <div key={link.to} className="relative group transform transition duration-150 hover:scale-95">
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="block pl-4 py-2 text-lg font-normal text-primaryText"
                    >
                      {link.label}
                    </Link>
                    <span
                      className={`
                        absolute bottom-0 left-4 h-0.5 w-[calc(100%-2rem)] bg-primaryText
                        transform transition-transform duration-200
                        ${isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </div>
                ))}

              {user && (
                <button
                  onClick={() => {
                    setShowLogoutModal(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center pl-4 py-2 transform transition duration-150 hover:scale-95"
                >
                  <img
                    src="/images/logo_usuario.png"
                    alt="Usuario"
                    className="h-8 w-8 mr-2"
                  />
                  <span className="text-primaryText text-lg font-normal">
                    Cerrar Sesión
                  </span>
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
