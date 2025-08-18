// src/utils/auth.js
import { API_URL_USUARIOS_USMP } from '../config';

// Trae el array completo de usuarios
export async function fetchUsuarios() {
  const res = await fetch(API_URL_USUARIOS_USMP);
  if (!res.ok) throw new Error('No se pudo cargar usuarios');
  return res.json(); // array de objetos
}

// Valida credenciales: devuelve usuario o null
export async function authenticate(email, password) {
  const usuarios = await fetchUsuarios();
  return (
    usuarios.find(
      u =>
        u.USER_EMAIL.toLowerCase() === email.toLowerCase() &&
        u.USER_PASSWORD === password
    ) ?? null
  );
}
