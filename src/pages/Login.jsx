// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const role = params.get('role'); // 'patient' o 'psychologist'
  const { loginPatient, loginPsych } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se validaría email/password contra la base de datos.
    if (role === 'patient') {
      loginPatient(email);
    } else if (role === 'psychologist') {
      loginPsych(email);
    } else {
      // Si no hay rol, regresamos a selección
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            {role === 'patient' ? 'Ingreso Paciente' : 'Ingreso Psicóloga'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              Entrar
            </button>
          </form>
          <button
            onClick={() => navigate('/')}
            className="mt-4 w-full py-2 text-center text-green-600 hover:underline"
          >
            ← Volver
          </button>
        </div>
      </div>

    </div>
  );
}
