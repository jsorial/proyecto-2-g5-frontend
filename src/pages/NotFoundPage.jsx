// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-6">La página que buscas no existe.</p>
      <Link to="/" className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
        Volver al Inicio
      </Link>
    </div>
  );
}
