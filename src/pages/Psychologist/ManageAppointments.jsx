// src/pages/Psychologist/ManageAppointments.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL_CITAS } from '../../config';
import localAppointments from '../../data/appointments.json';

export default function ManageAppointments() {
  const navigate = useNavigate();

  // Datos y filtros
  const [appointments, setAppointments] = useState([]);
  const [searchTerm,   setSearchTerm]   = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [psychFilter,  setPsychFilter]  = useState('Todos');
  const [typeFilter,   setTypeFilter]   = useState('Todos');
  const [modFilter,    setModFilter]    = useState('Todos');

  // Paginación
  const [currentPage,  setCurrentPage]  = useState(1);
  const [rowsPerPage,  setRowsPerPage]  = useState(5);

  // Carga inicial
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(`${API_URL_CITAS}/appointments.json`);
        if (!res.ok) throw new Error();
        setAppointments(await res.json());
      } catch {
        setAppointments(localAppointments);
      }
    })();
  }, []);

  // Opciones dinámicas de filtro
  const psychs = ['Todos', ...new Set(appointments.map(a => a.psicologa))];
  const types = ['Todos', ...new Set(appointments.map(a => a.tipo))];
  const mods  = ['Todos', ...new Set(appointments.map(a => a.modalidad))];

  // Filtrado conjunto
  const filtered = appointments.filter(a => {
    const matchSearch = 
      a.id.toString().includes(searchTerm) ||
      a.paciente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter==='Todos'  || a.estado===statusFilter;
    const matchPsych  = psychFilter==='Todos'   || a.psicologa===psychFilter;
    const matchType   = typeFilter==='Todos'    || a.tipo===typeFilter;
    const matchMod    = modFilter==='Todos'     || a.modalidad===modFilter;
    return matchSearch && matchStatus && matchPsych && matchType && matchMod;
  });

  // Paginación
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const pageItems  = filtered.slice((currentPage-1)*rowsPerPage, currentPage*rowsPerPage);

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-4 px-2">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6 relative">

        {/* X de cerrar */}
        <button
          onClick={() => navigate('/psych/home')}
          className="absolute top-4 right-4 bg-white rounded-full p-1 hover:bg-gray-100 transition"
        >
          <img src="/images/Equis_de_cuestionarios.png" alt="Cerrar" className="h-10 w-10"/>
        </button>

        <h2 className="text-2xl text-formTitle font-semibold text-center mb-6">
          Gestión de Citas
        </h2>

        {/* Controles de filtros */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <button
            onClick={() => navigate('/psych/create-appointment')}
            className="bg-formBtn text-white px-4 py-2 rounded-lg"
          >+ Crear Cita</button>

          <input
            type="text"
            placeholder="Buscar por paciente o ID"
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="border px-3 py-2 rounded"
          />

          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="border px-3 py-2 rounded"
          >
            {['Todos','Confirmada','Pendiente','Cancelada'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={psychFilter}
            onChange={e => { setPsychFilter(e.target.value); setCurrentPage(1); }}
            className="border px-3 py-2 rounded"
          >
            {psychs.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select
            value={typeFilter}
            onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1); }}
            className="border px-3 py-2 rounded"
          >
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select
            value={modFilter}
            onChange={e => { setModFilter(e.target.value); setCurrentPage(1); }}
            className="border px-3 py-2 rounded"
          >
            {mods.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* Tabla con columnas ampliadas */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-tableHeaderBg text-white">
              <tr>
                {['ID','Paciente','Psicóloga','Tipo','Modalidad','Fecha','Hora','Estado','Pagado','Acciones']
                  .map(h => <th key={h} className="px-4 py-2 text-left">{h}</th>)
                }
              </tr>
            </thead>
            <tbody>
              {pageItems.map(c => (
                <tr key={c.id} className="hover:bg-loginBg">
                  <td className="border px-4 py-2">{c.id}</td>
                  <td className="border px-4 py-2">{c.paciente}</td>
                  <td className="border px-4 py-2">{c.psicologa}</td>
                  <td className="border px-4 py-2">{c.tipo}</td>
                  <td className="border px-4 py-2">{c.modalidad}</td>
                  <td className="border px-4 py-2">{c.fecha}</td>
                  <td className="border px-4 py-2">{c.hora}</td>
                  <td className={`border px-4 py-2 font-medium ${
                    c.estado==='Confirmada'? 'text-stateActive'
                    : c.estado==='Pendiente'? 'text-primaryText'
                    : 'text-stateInactive'}`}
                  >{c.estado}</td>
                  <td className={`border px-4 py-2 font-medium ${
                    c.pagado?'text-stateActive':'text-stateInactive'}`}
                  >{c.pagado?'Sí':'No'}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => navigate(`/psych/edit-appointment/${c.id}`)}
                      className="px-2 py-1 bg-formBtn text-white rounded">Editar</button>
                    {c.estado!=='Cancelada' && (
                      <button
                        onClick={() => confirmCancel(c.id)}
                        className="px-2 py-1 bg-primaryBtn text-white rounded">Cancelar</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación sencilla */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(p-1,1))}
            disabled={currentPage===1}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >«</button>
          {[...Array(totalPages)].map((_,i) => (
            <button
              key={i+1}
              onClick={() => setCurrentPage(i+1)}
              className={`px-3 py-1 rounded ${
                currentPage===i+1 ? 'bg-primaryBtn text-white' : 'bg-gray-100'
              }`}
            >{i+1}</button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(p+1,totalPages))}
            disabled={currentPage===totalPages}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >»</button>
        </div>

      </div>
    </div>
  );
}
