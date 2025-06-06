// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { loginPatient, loginPsych } = useAuth();

  // Estado local para controlar la selección de rol
  const [role, setRole] = useState(null); // "patient" | "psychologist" | null
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Maneja el envío del formulario según el rol seleccionado
  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'patient') {
      loginPatient(email);
      navigate('/patient/home');
    } else if (role === 'psychologist') {
      loginPsych(email);
      navigate('/psych/home');
    }
  };

  // Renderiza la pantalla inicial con los botones de selección de rol
  const renderRoleSelection = () => (
    <div className="w-full flex flex-col items-center space-y-6">
      <h2 className="text-3xl font-semibold text-primaryText">Selecciona tu rol</h2>
      <button
        onClick={() => setRole('patient')}
        className="w-64 py-3 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
      >
        Ingresar como Paciente
      </button>
      <button
        onClick={() => setRole('psychologist')}
        className="w-64 py-3 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
      >
        Ingresar como Psicóloga
      </button>
      <button
        onClick={() => navigate('/')}
        className="mt-4 text-primaryText font-normal hover:underline transition"
      >
        ← Volver
      </button>
    </div>
  );

  // Renderiza el formulario de login con la "X" de cerrar
  const renderLoginForm = () => (
    <div className="relative w-full max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 p-8">
      {/* Botón "X" para cerrar y volver a selección de rol */}
      <button
        onClick={() => setRole(null)}
        className="absolute top-4 right-4"
        aria-label="Cerrar"
      >
        <img
          src="/images/Equis_de_cuestionarios.png"
          alt="Cerrar"
          className="h-15 w-10"
        />
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
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
        >
          Entrar
        </button>
      </form>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => navigate('/forgot-password')}
          className="text-primaryText font-normal hover:underline transition text-sm"
        >
          ¿Olvidaste tu contraseña?
        </button>
        <button
          onClick={() => setRole(null)}
          className="text-primaryText font-normal hover:underline transition text-sm"
        >
          ← Volver
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {/* Aquí va tu Navbar en App.jsx o en el contenedor superior */}
      {/* Supongamos que Navbar ocupa exactamente h-20 */}
      {/* El siguiente div debe ocupar la altura restante: 100vh - 5rem */}
      <div className="flex h-[calc(100vh-10rem)]">
        {/* Izquierda: imagen (oculta en móviles) */}
        <div className="hidden md:block md:w-1/2 h-full">

          <img
            src="/images/login.png"
            alt="Inicio Sesión"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Derecha: área de selección de rol o formulario de login */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-loginBg p-6">
          {role === null ? renderRoleSelection() : renderLoginForm()}
        </div>
      </div>
    </div>
  );
}
