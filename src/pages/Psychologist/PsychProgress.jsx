// src/pages/Psychologist/PatientProgress.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { API_URL_MIS_TEST_HISTORIAL, API_URL_PACIENTES } from '../../config';

export default function PatientProgress() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // filtros
  const [riskFilter, setRiskFilter] = useState('all');   // all|low|mod|high
  const [dateFilter, setDateFilter] = useState('30');    // días: '30','90','all'
  const [searchTerm, setSearchTerm] = useState('');
  const [scoreFilter, setScoreFilter] = useState('both');  // both|ansiedad|estres

  // 1) Define al inicio del componente:
  const PAGE_SIZE = 5;             // Pacientes por página
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL_MIS_TEST_HISTORIAL}/tests.json`).then(r => r.json()),
      fetch(`${API_URL_PACIENTES}/patients.json`).then(r => r.json()),
    ]).then(([testsData, patsData]) => {
      setTests(testsData);
      setPatients(patsData);
    }).catch(() => {
      import('../../data/tests.json').then(m => setTests(m.default));
      import('../../data/patients.json').then(m => setPatients(m.default));
    }).finally(() => setLoading(false));
  }, []);

  // Resumen
  const totalActive = useMemo(() =>
    patients.filter(p => p.estado === 'Activo').length
    , [patients]);
  const upcomingTests = useMemo(() =>
    tests.filter(t => new Date(t.date) >= new Date()).length
    , [tests]);
  const testsThisMonth = useMemo(() => {
    const now = new Date();
    return tests.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
  }, [tests]);

  // Filtra tests para la tabla de “destacados”
  const featured = useMemo(() => {
    const lastBy = {};
    tests.forEach(t => {
      const prev = lastBy[t.pacienteId];
      if (!prev || new Date(t.date) > new Date(prev.date)) lastBy[t.pacienteId] = t;
    });
    return Object.values(lastBy)
      .map(t => ({
        ...t,
        paciente: patients.find(p => p.idDoc === t.pacienteId)?.nombres + ' ' + patients.find(p => p.idDoc === t.pacienteId)?.apellidoPaterno,
        risk: t.ansiedad <= 17 ? 'low' : t.ansiedad <= 24 ? 'mod' : 'high'
      }))
      .filter(t => riskFilter === 'all' || t.risk === riskFilter)
      .filter(t => t.paciente.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(t => {
        if (dateFilter === 'all') return true;
        const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - +dateFilter);
        return new Date(t.date) >= cutoff;
      });
  }, [tests, patients, riskFilter, searchTerm, dateFilter]);

  // Prepara datos para gráfica de líneas (promedios diarios)
  const lineData = useMemo(() => {
    const byDate = {};
    tests.forEach(t => {
      byDate[t.date] ||= { ansiedad: 0, estres: 0, count: 0 };
      byDate[t.date].ansiedad += t.ansiedad;
      byDate[t.date].estres += t.estres;
      byDate[t.date].count++;
    });
    return Object.entries(byDate).sort()
      .map(([date, v]) => ({
        date,
        ...(scoreFilter !== 'estres' && { ansiedad: +(v.ansiedad / v.count).toFixed(1) }),
        ...(scoreFilter !== 'ansiedad' && { estres: +(v.estres / v.count).toFixed(1) }),
      }));
  }, [tests, scoreFilter]);

  // Datos barras: último test por paciente
  const riskData = useMemo(() => {
    const lastBy = {};
    tests.forEach(t => {
      const prev = lastBy[t.pacienteId];
      if (!prev || new Date(t.date) > new Date(prev.date)) lastBy[t.pacienteId] = t;
    });
    const cnt = { Bajo: 0, Moderado: 0, Alto: 0 };
    Object.values(lastBy).forEach(t => {
      const cat = t.ansiedad <= 17 ? 'Bajo' : t.ansiedad <= 24 ? 'Moderado' : 'Alto';
      cnt[cat]++;
    });
    return ['Bajo', 'Moderado', 'Alto'].map(c => ({ category: c, count: cnt[c] }));
  }, [tests]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-fondo_fuera_formularios_dentro_del_body">
        <div className="w-16 h-16 border-4 border-formBtn border-t-primaryBtn rounded-full animate-spin" />
      </div>
    );
  }



  // 2) Calcula páginas:
  const totalPages = Math.ceil(featured.length / PAGE_SIZE);
  const paginated = featured.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-12 px-8 space-y-10">

      {/* Título con Avatar */}
      <div className="flex items-center mb-8">
        <img src="/images/Blue.png" alt="Blue" className="w-16 h-16 mr-4" />
        <h1 className="text-3xl font-bold text-primaryText">Progreso de los Pacientes</h1>
      </div>


      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '👥', label: 'Pacientes Activos', value: totalActive },
          { icon: '🗓️', label: 'Tests Futuros', value: upcomingTests },
          { icon: '✅', label: 'Tests este mes', value: testsThisMonth },
        ].map((c, i) => (
          <div key={i}
            className="bg-white p-6 rounded-lg shadow border border-gray-200 flex items-center space-x-4 hover:shadow-lg transition"
          >
            <div className="text-4xl">{c.icon}</div>
            <div>
              <p className="text-3xl font-bold text-primaryText">{c.value}</p>
              <p className="text-gray-600">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Evolución */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-formTitle">Evolución Promedio</h3>
            <select
              className="px-2 py-1 bg-gray-200 rounded"
              value={scoreFilter}
              onChange={e => setScoreFilter(e.target.value)}
            >
              <option value="both">Ambos</option>
              <option value="ansiedad">Ansiedad</option>
              <option value="estres">Estrés</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              {scoreFilter !== 'estres' && <Line type="monotone" dataKey="ansiedad" stroke="#6b85bb" name="Ansiedad" />}
              {scoreFilter !== 'ansiedad' && <Line type="monotone" dataKey="estres" stroke="#58c9ec" name="Estrés" />}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución de riesgo */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-xl font-semibold text-formTitle mb-4">Distribución por Riesgo</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={riskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ea8bc5" name="Pacientes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Controles de filtrado */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex space-x-8">
          {/* Tabla resumida */}
          <h2 className="text-2xl font-semibold text-primaryText mb-4}8">
            Seguimiento de Pacientes
          </h2>
          <select
            className="px-3 py-1 bg-gray-200 rounded"
            value={riskFilter}
            onChange={e => setRiskFilter(e.target.value)}
          >
            <option value="all">Todos Riesgos</option>
            <option value="low">Bajo</option>
            <option value="mod">Moderado</option>
            <option value="high">Alto</option>
          </select>
          <select
            className="px-3 py-1 bg-gray-200 rounded"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
          >
            <option value="30">Últimos 30 días</option>
            <option value="90">Últimos 90 días</option>
            <option value="all">Todo</option>
          </select>
          <input
            className="px-3 py-1 border border-gray-300 rounded flex-1"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-1 bg-formBtn text-white rounded hover:bg-primaryTextActive transition"
        >
          ↻ Refrescar
        </button>
      </div>



      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-tableHeaderBg text-white">
            <tr>
              <th className="px-3 py-2">Paciente</th>
              <th className="px-3 py-2">Ansiedad</th>
              <th className="px-3 py-2">Estrés</th>
              <th className="px-3 py-2">Riesgo</th>
              <th className="px-3 py-2">Fecha</th>
              <th className="px-3 py-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(p => (
              <tr key={p.pacienteId} className="even:bg-gray-50 hover:bg-loginBg">
                <td className="px-3 py-2">{p.paciente}</td>
                <td className="px-3 py-2">{p.ansiedad}</td>
                <td className="px-3 py-2">{p.estres}</td>
                <td className={`px-3 py-2 capitalize ${p.risk === 'low' ? 'text-green-600'
                  : p.risk === 'mod' ? 'text-yellow-600'
                    : 'text-red-600'
                  }`}>
                  {p.risk === 'low' ? 'Bajo' : p.risk === 'mod' ? 'Moderado' : 'Alto'}
                </td>
                <td className="px-3 py-2">{p.date}</td>
                {/* <td className="px-3 py-2">
                  <button
                    onClick={() => navigate(`/psych/patient/${p.pacienteId}`)}
                    className="px-2 py-1 bg-primaryBtn text-white rounded hover:bg-primaryTextActive transition"
                  >
                    Ver
                  </button>
                </td> */}

                <td className="px-3 py-2">
                  <button
                    onClick={() => navigate(`/psych/results-test`)}
                    className="px-2 py-1 bg-primaryBtn text-white rounded hover:bg-primaryTextActive transition"
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            « Anterior
          </button>

          <span className="text-gray-600">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Siguiente »
          </button>
        </div>

      </div>

    </div>
  );
}
