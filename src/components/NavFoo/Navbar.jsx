// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  // 🔑 Usa el campo correcto de rol que guardamos en AuthContext
  const rol = (user?.rol || '').toUpperCase();
  const isGuest    = !user;
  const isPaciente = user && rol === 'PACIENTE';
  const isPsico    = user && rol === 'PSICOLOGO';
  const isAdmin    = user && rol === 'ADMIN';

  const displayName = user?.nombres || 'Usuario';

  const handleLogout = () => {
    // Cierra sesiones y UI
    logout();                       // limpia user + localStorage + navega a /login (según tu AuthContext)
    setShowLogoutConfirm(false);
    setShowUserMenu(false);
    setIsOpen(false);
  };

  const patientLinks = [
    { to: '/patient/home', label: 'Inicio' },
    // { to: '/patient/profile', label: 'Perfil' },
    // { to: '/patient/appointments', label: 'Mis Citas' },
    // { to: '/patient/progress', label: 'Mi Progreso' },
    // { to: '/patient/test', label: 'Test Psicométrico' },
    // { to: '/patient/resources', label: 'Recursos' },
  ];

  const psychLinks = [
    { to: '/psych/home', label: 'Inicio' },
    // { to: '/psych/manage-patients', label: 'Pacientes' },
    // { to: '/psych/manage-appointments', label: 'Citas' },
    { to: '/psych/progress', label: 'Progreso Pacientes' },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Panel' },
    { to: '/admin/usuarios', label: 'Usuarios' },
    // { to: '/admin/citas', label: 'Citas (global)' },
    // { to: '/admin/tests', label: 'Tests' },
    // { to: '/admin/reportes', label: 'Reportes' },
    // { to: '/admin/config', label: 'Config' },
  ];

  return (
    <>
      <nav className="bg-navbarBg border-b-2 border-navbarUnderline shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between h-20 items-center">
            {/* Logo y texto */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img src="/images/Logo_CPC.png" alt="Centro Psicológico CEM" className="h-12 w-auto" />
              </Link>
              <span className="ml-3 text-2xl sm:text-3xl font-bold text-primaryText">
                Centro Psicológico CEM
              </span>
            </div>

            {/* Menú de escritorio */}
            <div className="hidden sm:flex sm:space-x-8 sm:items-center">
              {isGuest && (
                <>
                  <div className="relative group transform transition duration-150 hover:scale-95">
                    <Link to="/" className="text-lg font-normal text-primaryText px-2">
                      Inicio
                    </Link>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full bg-primaryText transform transition-transform duration-200 ${
                        isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </div>

                  <Link to="/login" className="ml-6 transform transition duration-150 hover:scale-95">
                    <img src="/images/logo_inicio_sesion.png" alt="Iniciar Sesión" className="h-8 w-8" />
                  </Link>
                </>
              )}

              {isPaciente &&
                patientLinks.map((link) => (
                  <div key={link.to} className="relative group transform transition duration-150 hover:scale-95">
                    <Link to={link.to} className="text-lg font-normal text-primaryText px-2">
                      {link.label}
                    </Link>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full bg-primaryText transform transition-transform duration-200 ${
                        isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </div>
                ))}

              {isPsico &&
                psychLinks.map((link) => (
                  <div key={link.to} className="relative group transform transition duration-150 hover:scale-95">
                    <Link to={link.to} className="text-lg font-normal text-primaryText px-2">
                      {link.label}
                    </Link>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full bg-primaryText transform transition-transform duration-200 ${
                        isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </div>
                ))}

              {isAdmin &&
                adminLinks.map((link) => (
                  <div key={link.to} className="relative group transform transition duration-150 hover:scale-95">
                    <Link to={link.to} className="text-lg font-normal text-primaryText px-2">
                      {link.label}
                    </Link>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full bg-primaryText transform transition-transform duration-200 ${
                        isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </div>
                ))}

              {user && (
                <button
                  onClick={() => setShowUserMenu(true)}
                  className="ml-6 transform transition duration-150 hover:scale-95"
                  aria-label="Menú de usuario"
                >
                  <img src="/images/logo_usuario.png" alt="Usuario" className="h-8 w-8" />
                </button>
              )}
            </div>

            {/* Botón móvil */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primaryText"
                aria-label="Abrir menú"
              >
                {isOpen ? (
                  <svg className="h-8 w-8 text-primaryText" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-8 w-8 text-primaryText" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
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
              {isGuest && (
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
                      className={`absolute bottom-0 left-4 h-0.5 w-[calc(100%-2rem)] bg-primaryText transform transition-transform duration-200 ${
                        isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/login');
                    }}
                    className="flex flex-col items-center pl-4 py-2 transform transition duration-150 hover:scale-95"
                  >
                    <img src="/images/logo_inicio_sesion.png" alt="Iniciar Sesión" className="h-8 w-8 mb-1" />
                    <span className="text-primaryText text-lg font-normal">Iniciar Sesión</span>
                  </button>
                </>
              )}

              {isPaciente &&
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
                      className={`absolute bottom-0 left-4 h-0.5 w-[calc(100%-2rem)] bg-primaryText transform transition-transform duration-200 ${
                        isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </div>
                ))}

              {isPsico &&
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
                      className={`absolute bottom-0 left-4 h-0.5 w-[calc(100%-2rem)] bg-primaryText transform transition-transform duration-200 ${
                        isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </div>
                ))}

              {isAdmin &&
                adminLinks.map((link) => (
                  <div key={link.to} className="relative group transform transition duration-150 hover:scale-95">
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="block pl-4 py-2 text-lg font-normal text-primaryText"
                    >
                      {link.label}
                    </Link>
                    <span
                      className={`absolute bottom-0 left-4 h-0.5 w-[calc(100%-2rem)] bg-primaryText transform transition-transform duration-200 ${
                        isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </div>
                ))}

              {user && (
                <button
                  onClick={() => {
                    setShowLogoutConfirm(true);  // 🔔 abre confirmación directo en móvil
                    setIsOpen(false);
                  }}
                  className="flex items-center pl-4 py-2 transform transition duration-150 hover:scale-95"
                >
                  <img src="/images/logo_usuario.png" alt="Usuario" className="h-8 w-8 mr-2" />
                  <span className="text-primaryText text-lg font-normal">Cerrar Sesión</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Modal de opciones de usuario (perfil / cerrar) */}
      {showUserMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-64 p-6 relative">
            <button
              onClick={() => setShowUserMenu(false)}
              className="absolute top-4 right-2 bg-white rounded-full p-1 hover:bg-gray-100 transition"
              aria-label="Cerrar"
            >
              <img src="/images/Equis_de_cuestionarios.png" alt="Cerrar" className="h-10 w-10" />
            </button>

            <h3 className="text-lg font-semibold text-primaryText mb-4 text-center">
              ¡Hola, {displayName}!
            </h3>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  if (isPaciente) navigate('/patient/profile');
                  else if (isPsico) navigate('/psych/profile');
                  else if (isAdmin) navigate('/admin/profile');
                }}
                className="w-full px-4 py-2 bg-formBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
              >
                Ver Perfil
              </button>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  setShowLogoutConfirm(true); // 🔔 abre confirmación
                }}
                className="w-full px-4 py-2 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de cierre de sesión */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute top-4 right-2 bg-white rounded-full p-1 hover:bg-gray-100 transition"
              aria-label="Cerrar"
            >
              <img src="/images/Equis_de_cuestionarios.png" alt="Cerrar" className="h-10 w-10" />
            </button>

            <h3 className="text-xl font-semibold text-primaryText mb-4 text-center">
              ¿Estás seguro que deseas cerrar sesión?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}   // ✅ cierra sesión y limpia UI
                className="w-full px-4 py-2 bg-formBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
              >
                Sí
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full px-4 py-2 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
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
