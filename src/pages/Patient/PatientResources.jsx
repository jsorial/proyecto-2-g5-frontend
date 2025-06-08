// src/pages/Patient/PatientResources.jsx
import React, { useState, useEffect } from 'react';
import { API_URL_RECURSOS } from '../../config';

const CATEGORIES = [
  { value: 'all',  label: 'Todos' },
  { value: 'pdf',  label: 'PDF'   },
  { value: 'video',label: 'Video' },
];

export default function PatientResources() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter]       = useState('all');
  const [search, setSearch]       = useState('');
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL_RECURSOS}/resources.json`);
        if (!res.ok) throw new Error();
        setResources(await res.json());
      } catch {
        const local = await import('../../data/resources.json');
        setResources(local.default);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = resources
    .filter(r => filter === 'all' || r.category === filter)
    .filter(r => r.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-fondo_fuera_formularios_dentro_del_body">
        <div className="w-12 h-12 border-4 border-formBtn border-t-primaryBtn rounded-full animate-spin" />
        <p className="ml-4 text-primaryText">Cargando recursos…</p>
      </div>
    );
  }

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-12 px-4">
      <h1 className="text-4xl font-bold text-primaryText text-center mb-6">
        Recursos de Bienestar
      </h1>

      {/* Búsqueda */}
      <div className="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Buscar recurso..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
        />
      </div>

      {/* Filtro por categoría */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-center space-x-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-2 rounded-lg font-medium transition
              ${filter === cat.value
                ? 'bg-formBtn text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filtered.map(res => (
          <div
            key={res.id}
            className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-40 bg-loginBg flex items-center justify-center p-4">
              <img
                src={res.image}
                alt={res.title}
                className="max-h-full object-contain"
              />
            </div>
            <div className="p-6 flex flex-col justify-between h-60">
              <div>
                <h2 className="text-2xl font-semibold text-formTitle mb-2">
                  {res.title}
                </h2>
                <p className="text-gray-700 mb-4">{res.description}</p>
              </div>
              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition 
                  ${res.category === 'pdf'
                    ? 'bg-formBtn text-white hover:bg-primaryTextActive'
                    : 'bg-primaryBtn text-white hover:bg-primaryTextActive'}`}
              >
                {res.category === 'pdf'
                  ? '📄 Descargar PDF'
                  : (<><span className="mr-2">▶</span>Ver Video</>)}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
