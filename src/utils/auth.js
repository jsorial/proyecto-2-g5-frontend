// src/utils/auth.js


import { API_URL_AUTH_LOGIN } from '../config';

const LOGIN_URL = API_URL_AUTH_LOGIN || '';

function persistSession(user, token) {
  localStorage.setItem('cem_user', JSON.stringify(user));
  if (token) localStorage.setItem('cem_token', token);
}

export function getAuthHeaders() {
  const t = localStorage.getItem('cem_token');
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('cem_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Login contra FastAPI
 * Devuelve: { ok:true, user, token } o { ok:false, error }
 */
export async function authenticate(email, password) {
  if (!LOGIN_URL) {
    return { ok: false, error: 'VITE_API_URL_AUTH_LOGIN no configurado' };
  }

  try {
    const r = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!r.ok) {
      if (r.status === 401 || r.status === 403) {
        return { ok: false, error: 'Credenciales inválidas' };
      }
      const msg = await r.text();
      return { ok: false, error: `Error ${r.status}: ${msg || 'No esperado'}` };
    }

    // Espera: { user:{...}, token:{ access_token, ... } }
    const payload = await r.json();
    const user  = payload?.user;
    const token = payload?.token?.access_token || null;

    if (!user) return { ok: false, error: 'Respuesta inválida del servidor' };

    persistSession(user, token);
    return { ok: true, user, token: payload.token };
  } catch (e) {
    return { ok: false, error: 'No se pudo conectar con el servidor' };
  }
}
