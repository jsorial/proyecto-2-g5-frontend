// src/pages/Patient/PatientProfile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function PatientProfile() {
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

  // Simular carga de datos
  useEffect(() => {
    // En un caso real, se haría fetch('/api/patient/profile/' + user.id)
    // Aquí simulamos con datos fijos:
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
    // fetch('/api/patient/profile/update', { method: 'POST', body: JSON.stringify(profile) })
    alert('Perfil actualizado correctamente.');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Mi Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos básicos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Nombres</label>
            <input
              type="text"
              value={profile.nombres}
              onChange={(e) => setProfile((p) => ({ ...p, nombres: e.target.value }))}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Apellido Paterno</label>
            <input
              type="text"
              value={profile.apellidoPaterno}
              onChange={(e) =>
                setProfile((p) => ({ ...p, apellidoPaterno: e.target.value }))
              }
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Apellido Materno</label>
            <input
              type="text"
              value={profile.apellidoMaterno}
              onChange={(e) =>
                setProfile((p) => ({ ...p, apellidoMaterno: e.target.value }))
              }
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600"
            />
            <span className="text-sm text-gray-500">No puedes modificar tu correo.</span>
          </div>
        </div>

        {/* Campos opcionales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              value={profile.direccion}
              onChange={(e) => setProfile((p) => ({ ...p, direccion: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Teléfono</label>
            <input
              type="text"
              value={profile.telefono}
              onChange={(e) => setProfile((p) => ({ ...p, telefono: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Tipo de Documento</label>
            <input
              type="text"
              value={profile.documentoTipo}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600"
            />
            <span className="text-sm text-gray-500">No modificable.</span>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Número de Documento</label>
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
        <div className="space-y-4">
          <h3 className="text-gray-800 font-semibold">Cambiar Contraseña</h3>
          <div>
            <label className="block text-gray-700 mb-1">Nueva Contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
