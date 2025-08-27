// src/components/LoadingScreen.jsx
import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-fondo_fuera_formularios_dentro_del_body px-4">
      {/* Imagen de Blue a la izquierda */}
      <img
        src="/images/Blue.png"
        alt="Blue"
        className="w-60 h-60 mr-12 animate-pulse"
      />

      {/* Spinner + mensaje a la derecha */}
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner más grande */}
        <div className="w-16 h-16 border-4 border-formBtn border-t-primaryBtn rounded-full animate-spin" />

        {/* Mensaje con texto más grande */}
        <p className="text-2xl text-primaryText text-center">
          Espérate un ratito más.<br />
          ¡Ya conoceremos tus resultados!
        </p>
      </div>
    </div>
  );
}
