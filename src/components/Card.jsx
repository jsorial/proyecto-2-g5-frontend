import React from 'react';
export default function Card({ title, highlight, children }) {
  const base = "rounded-xl shadow p-6 transition-transform transform hover:-translate-y-1 hover:shadow-lg";
  const classes = highlight
    ? `${base} bg-red-500 text-white`
    : `${base} bg-white`;
  return (
    <div className={classes}>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
}
