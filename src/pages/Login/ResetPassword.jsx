// src/pages/Login/ResetPassword.jsx
import React, { useEffect, useState } from 'react';
import { API_URL_PW_VALIDATE, API_URL_PW_RESET } from '../../config';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const token = sp.get('token') || '';

  const [valid, setValid] = useState(false);
  const [checking, setChecking] = useState(true);
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!token) { setValid(false); setChecking(false); return; }
    (async () => {
      try {
        const r = await fetch(`${API_URL_PW_VALIDATE}?token=${encodeURIComponent(token)}`);
        setValid(r.ok);
      } catch {
        setValid(false);
      } finally {
        setChecking(false);
      }
    })();
  }, [token]);


  const onSubmit = async (e) => {
    e.preventDefault();
    if (pw1 !== pw2) { setMsg('Las contraseñas no coinciden'); return; }
    if (pw1.length < 6) { setMsg('Mínimo 6 caracteres'); return; }
    try {
      const r = await fetch(API_URL_PW_RESET, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: pw1 }),
      });
      if (r.ok) {
        setMsg('Contraseña actualizada. Redirigiendo…');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        const t = await r.json().catch(() => ({}));
        setMsg(t?.detail || 'No se pudo actualizar');
      }
    } catch {
      setMsg('Error de red');
    }
  };

  if (checking) return <div className="p-8 text-center">Verificando enlace…</div>;
  if (!valid) return <div className="p-8 text-center text-red-600">Enlace inválido o expirado</div>;

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-loginBg p-6">
      <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-lg border p-6 w-full max-w-sm space-y-4">
        <h2 className="text-xl font-semibold text-primaryText text-center">Restablecer contraseña</h2>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={pw1}
          onChange={(e) => setPw1(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
        {msg && <p className="text-sm text-center text-gray-700">{msg}</p>}
        <button type="submit" className="w-full py-2 bg-primaryBtn text-white rounded-lg">
          Guardar
        </button>
      </form>
    </div>
  );
}
