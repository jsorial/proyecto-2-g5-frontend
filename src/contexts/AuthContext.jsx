// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../utils/auth';

const AuthContext = createContext();

// Claves de almacenamiento
const STORAGE_USER_KEY = 'cem_user';
const STORAGE_TOKEN_KEY = 'cem_token';

// Asegura forma estable del user en el front
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
    genero: raw.genero ? String(raw.genero).toUpperCase() : null,
    // ⚠️ No guardamos token aquí; va en STORAGE_TOKEN_KEY
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_USER_KEY); // ✅ nombre correcto
      const parsed = raw ? JSON.parse(raw) : null;
      const norm = normalizeUser(parsed);
      console.log('[AuthContext] restored user:', norm);
      setUser(norm);
    } catch (e) {
      console.warn('[AuthContext] failed to parse stored user:', e);
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Login contra el backend (usa utils/auth.authenticate)
  const login = async (email, password) => {
    console.log('[AuthContext] login -> calling authenticate', { email });
    const res = await authenticate(email, password);
    console.log('[AuthContext] login <- authenticate result:', res); // ✅ 'res' (no 'u')

    if (res?.ok && res.user) {
      const norm = normalizeUser(res.user);
      setUser(norm);
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(norm));

      // Guarda token si vino
      const access = res.token?.access_token;
      if (access) localStorage.setItem(STORAGE_TOKEN_KEY, access);

      // Redirección según rol
      const nextByRole = {
        PACIENTE: '/patient/home',
        PSICOLOGO: '/psych/home',
        ADMIN: '/',
      };
      const to = nextByRole[norm.rol] ?? '/';
      navigate(to, { replace: true });

      return { ok: true };
    }

    return { ok: false, error: res?.error || 'Credenciales inválidas' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY); // <-- borra también el token
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
