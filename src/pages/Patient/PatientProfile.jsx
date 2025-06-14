// src/pages/Patient/PatientProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PatientProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Estado local del perfil (cargado desde “backend” simulado)
  const [profile, setProfile] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    direccion: '',
    telefono: '',
    documentoTipo: '',
    documentoNumero: '',
    email: '',
  });

  // Contraseña
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  // Simular carga de datos
  useEffect(() => {
    // En un caso real, se haría fetch('/api/patient/profile/' + user.id)
    const datosSimulados = {
      nombres: 'Juan Carlos',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'Gómez',
      direccion: 'Av. Siempre Viva 123',
      telefono: '987654321',
      documentoTipo: 'DNI',
      documentoNumero: '12345678',
      email: user.email, // asumimos que viene del user
    };
    setProfile(datosSimulados);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar contraseñas si se llenaron
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      // Aquí llamarías al endpoint para actualizar contraseña
    }
    // Llamar a endpoint para actualizar perfil (nombres, apellidos, direccion, telefono)
    alert('Perfil actualizado correctamente.');
  };

  return (
    // 1) Este es el fondo “global” fuera del card
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-2">
      {/* 2) Centras y acotas el ancho del “card” blanco */}
      <div className="relative max-w-5xl mx-auto mt-8 mb-12 bg-white p-8 rounded-lg shadow border border-gray-200">
        {/** ------------------ INSERTAR AQUÍ LA “X” PARA SALIR DEL TEST ------------------ **/}
        <button
          onClick={() => navigate('/patient/home')}
        
          className="absolute top-6 right-4 bg-white rounded-full p-1 hover:bg-gray-100 transition"
          aria-label="Cerrar Perfil"
        >
          <img
            src="/images/Equis_de_cuestionarios.png"
            alt="Cerrar"
            className="h-14 w-14"
          />
        </button>
        <h2 className="text-2xl font-semibold text-formTitle mb-6 text-center">
          Mi Perfil
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos básicos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-primaryText mb-1">Nombres</label>
              <input
                type="text"
                value={profile.nombres}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, nombres: e.target.value }))
                }
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
            <div>
              <label className="block text-primaryText mb-1">
                Apellido Paterno
              </label>
              <input
                type="text"
                value={profile.apellidoPaterno}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    apellidoPaterno: e.target.value,
                  }))
                }
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
            <div>
              <label className="block text-primaryText mb-1">
                Apellido Materno
              </label>
              <input
                type="text"
                value={profile.apellidoMaterno}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    apellidoMaterno: e.target.value,
                  }))
                }
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
            <div>
              <label className="block text-primaryText mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600"
              />
              <span className="text-sm text-gray-500">
                No puedes modificar tu correo.
              </span>
            </div>
          </div>

          {/* Campos opcionales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-primaryText mb-1">Dirección</label>
              <input
                type="text"
                value={profile.direccion}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, direccion: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
            <div>
              <label className="block text-primaryText mb-1">Teléfono</label>
              <input
                type="text"
                value={profile.telefono}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, telefono: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
            <div>
              <label className="block text-primaryText mb-1">
                Tipo de Documento
              </label>
              <input
                type="text"
                value={profile.documentoTipo}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600"
              />
              <span className="text-sm text-gray-500">No modificable.</span>
            </div>
            <div>
              <label className="block text-primaryText mb-1">
                Número de Documento
              </label>
              <input
                type="text"
                value={profile.documentoNumero}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600"
              />
              <span className="text-sm text-gray-500">No modificable.</span>
            </div>
          </div>

          {/* Actualizar contraseña */}
          {/* Actualizar contraseña */}
          <div className="space-y-4">
            <h3 className="text-formTitle font-semibold">Cambiar Contraseña</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nueva contraseña */}
              {/* Nueva contraseña */}
              <div className="relative">
                <label className="block text-primaryText mb-1">
                  Nueva Contraseña
                </label>
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-primaryText"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(v => !v)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                >
                  {showNew
                    ? /* icon ojo abierto */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    : /* icon ojo cerrado */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.24.232-2.428.65-3.52M6.6 6.6l10.8 10.8" />
                    </svg>
                  }
                </button>
              </div>

              {/* Confirmar contraseña */}
              <div className="relative">
                <label className="block text-primaryText mb-1">
                  Confirmar Contraseña
                </label>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-primaryText"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3 top-0 h-full flex items-center text-gray-500"
                  tabIndex={-1}
                >
                  {showConfirm
                    ? /* ojo abierto svg */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    : /* ojo cerrado svg */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.24.232-2.428.65-3.52M6.6 6.6l10.8 10.8" />
                    </svg>
                  }
                </button>
              </div>

            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-formBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
          >
            Guardar cambios
          </button>
        </form>
      </div>

    </div>
  );
}
