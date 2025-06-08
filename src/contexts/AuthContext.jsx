// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Estructura del usuario simulado
// role: 'patient' o 'psychologist'

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Simular login de paciente
  const loginPatient = (email) => {
    // Aquí podrías validar email/contraseña con backend, pero en esta simulación
    // simplemente creamos un objeto "user"
    const simulatedUser = {
      role: 'patient',
      email,
      nombre: 'Paciente Ejemplo',
      id: Math.floor(Math.random() * 10000), // id único simulado
    };
    setUser(simulatedUser);
    // Redirigir a la home del paciente
    navigate('/patient/home');
  };

  // Simular login de psicóloga
  const loginPsych = (email) => {
    const simulatedUser = {
      role: 'psychologist',
      email,
      nombre: 'Psicóloga Ejemplo',
      id: Math.floor(Math.random() * 10000),
    };
    setUser(simulatedUser);
    navigate('/psych/home');
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loginPatient, loginPsych, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
