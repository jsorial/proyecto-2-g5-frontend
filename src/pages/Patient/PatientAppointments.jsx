// src/pages/Patient/PatientAppointments.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL_MIS_CITAS } from '../../config';
import localAppointments from '../../data/myAppointments.json';

const PAGE_SIZE = 5;

export default function PatientAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterState, setFilterState] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch(`${API_URL_MIS_CITAS}/myAppointments.json`);
        if (!res.ok) throw new Error('Fetch failed');
        setAppointments(await res.json());
      } catch {
        setAppointments(localAppointments);
      }
    }
    fetchAppointments();
  }, []);

  // Extraer meses, años, tipos y estados de las citas
  const months = useMemo(() => {
    const setM = new Set();
    appointments.forEach(a => setM.add(new Date(a.fecha).getMonth()));
    return Array.from(setM).sort();
  }, [appointments]);

  const years = useMemo(() => {
    const setY = new Set();
    appointments.forEach(a => setY.add(new Date(a.fecha).getFullYear()));
    return Array.from(setY).sort();
  }, [appointments]);

  const types = useMemo(() => {
    const setT = new Set();
    appointments.forEach(a => setT.add(a.tipo));
    return Array.from(setT);
  }, [appointments]);

  const states = useMemo(() => {
    const setS = new Set();
    appointments.forEach(a => setS.add(a.estado));
    return Array.from(setS);
  }, [appointments]);

  // Filtrar
  const filtered = useMemo(() => {
    return appointments.filter(a => {
      const dt = new Date(a.fecha);
      const okMonth = filterMonth === 'all' || dt.getMonth() === +filterMonth;
      const okYear = filterYear === 'all' || dt.getFullYear() === +filterYear;
      const okType = filterType === 'all' || a.tipo === filterType;
      const okState = filterState === 'all' || a.estado === filterState;
      return okMonth && okYear && okType && okState;
    });
  }, [appointments, filterMonth, filterYear, filterType, filterState]);

  // Paginación
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page al cambiar filtros
  useEffect(() => { setPage(1); }, [filterMonth, filterYear, filterType, filterState]);

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-6 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
        {/* Cabecera */}
        <div className="flex items-center mb-6">
          <img src="/images/Blue.png" alt="Blue" className="w-16 h-16 mr-4" />
          <h2 className="text-3xl font-semibold text-primaryText flex-1">
            Mis Citas Programadas
          </h2>
          <button
            onClick={() => navigate('/patient/home')}
            className="px-3 py-1 bg-navbarBg rounded hover:bg-gray-100 transition"
          >
            ← Volver
          </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
          {/* Mes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mes</label>
            <select
              value={filterMonth}
              onChange={e => setFilterMonth(e.target.value)}
              className="mt-1 block w-full border border-primaryBtn rounded"
            >
              <option value="all">Todos</option>
              {months.map(m => (
                <option key={m} value={m}>
                  {new Date(0, m).toLocaleString('es-PE', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          {/* Año */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Año</label>
            <select
              value={filterYear}
              onChange={e => setFilterYear(e.target.value)}
              className="mt-1 block w-full border border-primaryBtn rounded"
            >
              <option value="all">Todos</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Tipo de cita */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="mt-1 block w-full border border-primaryBtn rounded"
            >
              <option value="all">Todos</option>
              {types.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              value={filterState}
              onChange={e => setFilterState(e.target.value)}
              className="mt-1 block w-full border border-primaryBtn rounded"
            >
              <option value="all">Todos</option>
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Espacio extra para diseño */}
          <div className="hidden lg:block" />
        </div>

        {/* Tabla */}
        {paged.length === 0 ? (
          <p className="text-gray-600">No se encontraron citas con esos filtros.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-tableHeaderBg">
                  {['Fecha','Hora','Psicóloga','Tipo','Modalidad','Estado','Notas'].map(col => (
                    <th key={col} className="border px-4 py-2 text-left text-white">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map(apt => (
                  <tr key={apt.id} className="hover:bg-loginBg transition">
                    <td className="border px-4 py-2">{apt.fecha}</td>
                    <td className="border px-4 py-2">{apt.hora}</td>
                    <td className="border px-4 py-2">{apt.psicologa}</td>
                    <td className="border px-4 py-2">{apt.tipo}</td>
                    <td className="border px-4 py-2">{apt.modalidad}</td>
                    <td
                      className={`border px-4 py-2 font-medium ${
                        apt.estado === 'Confirmada'
                          ? 'text-stateActive'
                          : 'text-stateInactive'
                      }`}
                    >
                      {apt.estado}
                    </td>
                    <td className="border px-4 py-2">{apt.notas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginador */}
        {pageCount > 1 && (
          <div className="mt-4 flex justify-center items-center space-x-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-1 bg-formBtn text-white rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-gray-700">
              Página {page} de {pageCount}
            </span>
            <button
              onClick={() => setPage(p => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              className="px-4 py-1 bg-formBtn text-white rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
