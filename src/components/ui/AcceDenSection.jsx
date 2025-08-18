// src/components/usmp/dashboard/ui/AcceDenSection.jsx
import React from 'react';

export default function AcceDenSection({ title, children }) {
  return (
    <div className="mx-auto my-8 max-w-3xl bg-neutral-50 rounded-2xl p-8 shadow-lg border-4 border-claroRed">
      <h3
        style={{
          WebkitTextStroke: "1px #A80000",
          WebkitTextFillColor: "#E60000",
          backgroundImage: "linear-gradient(90deg, #E60000, #A80000)",
          WebkitBackgroundClip: "text",
          transition: "all 0.3s ease-in-out",
        }}
        className={`
            transform transition-all duration-300
            text-center
            text-6xl md:text-2xl   /* Título más grande */
            font-extrabold uppercase
            tracking-widest
            drop-shadow-lg mb-4
            hover:scale-110         /* Zoom al pasar */
            hover:translate-x-4     /* Se mueve 1rem a la derecha */
            hover:drop-shadow-2xl
            origin-center           /* Punto de anclaje en el centro */
          `}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
