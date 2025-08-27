// src/utils/auth.js
import { API_URL_USUARIOS } from '../config';

// Trae el array completo de usuarios
export async function fetchUsuarios() {
  const res = await fetch(API_URL_USUARIOS);
  if (!res.ok) throw new Error('No se pudo cargar usuarios');
  return res.json(); // array de objetos
}

// Para guardar en el cliente solo lo necesario
function sanitizeUser(u) {
  return {
    id: u.id,
    email: u.email,
    rol: u.rol,                 // ⬅️ importante
    nombres: u.nombres ?? '',
    apellidos: u.apellidos ?? '',
    foto_url: u.foto_url ?? null,
  };
}

// Valida credenciales: devuelve usuario (sanitizado) o null
export async function authenticate(email, password) {
  const usuarios = await fetchUsuarios();
  const found = usuarios.find(
    u =>
      u.email?.toLowerCase() === email?.toLowerCase() &&
      u.password_hash === password
  );
  return found ? sanitizeUser(found) : null;
}