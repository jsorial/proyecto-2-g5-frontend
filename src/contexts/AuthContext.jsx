// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate              = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('usmp_user');
    if (raw) setUser(JSON.parse(raw));
    else     setUser(null);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const u = await authenticate(email, password);
    if (u) {
      setUser(u);
      localStorage.setItem('usmp_user', JSON.stringify(u));

      // ⬇️ Redirección según rol (ajusta rutas a las tuyas reales)
      const nextByRole = {
        'PACIENTE'  : '/',             // o '/paciente'
        'PSICOLOGO' : '/',        // o '/psych/home'
        'ADMIN'     : '/'
      };
      const to = nextByRole[u.rol?.toUpperCase()] ?? '/';
      navigate(to, { replace: true });

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('usmp_user');
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
