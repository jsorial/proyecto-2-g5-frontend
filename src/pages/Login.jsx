// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await login(email, password);
      if (!res?.ok) setError(res?.error || 'No se pudo iniciar sesión');
      // Si ok === true, AuthContext ya navegó según rol.
    } catch (err) {
      setError('Ocurrió un error inesperado');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-[calc(100vh-10rem)]">
        {/* Izquierda: imagen (oculta en móviles) */}
        <div className="hidden md:block md:w-1/2 h-full">
          <img
            src="/images/login.png"
            alt="Inicio Sesión"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Derecha: formulario */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-loginBg p-6">
          <div className="relative w-full max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            {/* Botón “X” para cerrar y volver atrás */}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="absolute top-6 right-4 bg-white rounded-full p-1 hover:bg-gray-100 transition"
              aria-label="Cerrar"    >
              <img
                src="/images/Equis_de_cuestionarios.png"
                alt="Cerrar"
                className="h-10 w-10" />
            </button>

            <h2 className="text-2xl font-semibold text-primaryText text-center mb-6">
              INICIO DE SESIÓN
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                  autoComplete="email"
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition disabled:opacity-60"
              >
                {submitting ? 'Entrando…' : 'Entrar'}
              </button>
            </form>

            <div className="mt-4 flex justify-between items-center">
              <a
                href="/forgot-password"
                className="text-primaryText font-normal hover:underline transition text-sm"
              >
                ¿Olvidaste tu contraseña?
              </a>
              <a
                href="/"
                className="text-primaryText font-normal hover:underline transition text-sm"
              >
                ← Volver
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
