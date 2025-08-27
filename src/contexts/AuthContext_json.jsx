// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../utils/auth';

const AuthContext = createContext();
const STORAGE_KEY = 'cem_user';


function normalizeUser(raw) {
  if (!raw) return null;
  const rol = (raw.rol ?? raw.role ?? '').toString().trim().toUpperCase();
  const id = raw.id ?? raw.id_paciente ?? raw.email; // ajusta si tu backend usa otro campo
  return {
    id: String(id),
    rol,
    email: raw.email ?? null,
    nombres: raw.nombres ?? null,
    apellidos: raw.apellidos ?? null,
    token: raw.token ?? raw.accessToken ?? null,
  };
}


export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setUser(normalizeUser(JSON.parse(raw))); }
      catch { setUser(null); }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const u = await authenticate(email, password);
    if (u) {
      const norm = normalizeUser(u);
      setUser(norm);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(norm));

      // ⬇️ Redirección según rol (ajusta rutas a las tuyas reales)
      const nextByRole = {
        'PACIENTE': '/',             // o '/paciente'
        'PSICOLOGO': '/',        // o '/psych/home'
        'ADMIN': '/'
      };
      const to = nextByRole[norm.rol] ?? '/';
      navigate(to, { replace: true });

      return { ok: true };
    }
    return { ok: false, error: 'Credenciales inválidas' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
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
