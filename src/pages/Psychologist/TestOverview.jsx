// src/pages/Psychologist/TestsInsights.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { API_URL_MIS_TEST_HISTORIAL } from '../../config';

const DATE_RANGES = [
  { label: 'Últimos 7 días', days: 7 },
  { label: 'Últimos 30 días', days: 30 },
  { label: 'Últimos 90 días', days: 90 },
  { label: 'Todo', days: null },
];
const PAGE_SIZE = 8;

export default function TestsInsights() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [dateRange, setDateRange] = useState(30);
  const [typeFilter, setTypeFilter] = useState('all'); // all|inicial|seguimiento
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${API_URL_MIS_TEST_HISTORIAL}/tests.json`)
      .then(r => r.json())
      .then(data => setTests(data))
      .catch(() => import('../../data/tests.json').then(m => setTests(m.default)))
      .finally(() => setLoading(false));
  }, []);

  // Filtrado principal
  const filtered = useMemo(() => {
    const now = new Date();
    return tests
      .filter(t => {
        if (typeFilter!=='all' && t.testType!==typeFilter) return false;
        if (search && !t.pacienteId.includes(search)) return false;
        if (dateRange) {
          const cutoff = new Date(now);
          cutoff.setDate(now.getDate() - dateRange);
          if (new Date(t.date) < cutoff) return false;
        }
        return true;
      })
      .sort((a,b)=> new Date(b.date)-new Date(a.date));
  }, [tests, dateRange, typeFilter, search]);

  // Paginación
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  // Métricas agregadas
  const totalTests = filtered.length;
  const avgScores = useMemo(() => {
    if (!filtered.length) return { anxiety:0, stress:0 };
    const sum = filtered.reduce((acc, t) => ({
      anxiety: acc.anxiety + t.ansiedad,
      stress:  acc.stress + t.estres
    }), { anxiety:0, stress:0 });
    return {
      anxiety: (sum.anxiety/totalTests).toFixed(1),
      stress:  (sum.stress/ totalTests).toFixed(1)
    };
  }, [filtered, totalTests]);

  // Tendencia diaria
  const dailyTrend = useMemo(() => {
    const byDate = {};
    filtered.forEach(t => {
      byDate[t.date] ||= { ansiedad:0, estres:0, count:0 };
      byDate[t.date].ansiedad += t.ansiedad;
      byDate[t.date].estres   += t.estres;
      byDate[t.date].count++;
    });
    return Object.entries(byDate).sort()
      .map(([date, v]) => ({
        date,
        ansiedad: +(v.ansiedad/v.count).toFixed(1),
        estres:   +(v.estres  /v.count).toFixed(1),
      }));
  }, [filtered]);

  // Distribución por tipo
  const byType = useMemo(() => {
    const cnt = { inicial:0, seguimiento:0 };
    filtered.forEach(t => cnt[t.testType]++);
    return Object.entries(cnt).map(([type, value]) => ({ type, value }));
  }, [filtered]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-fondo_fuera_formularios_dentro_del_body">
        <div className="w-16 h-16 border-4 border-formBtn border-t-primaryBtn rounded-full animate-spin"/>
      </div>
    );
  }

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-12 px-8 space-y-10">
      {/* Header */}
      <div className="flex items-center mb-6">
        <img src="/images/Blue.png" alt="Blue" className="w-16 h-16 mr-4"/>
        <h1 className="text-3xl font-bold text-primaryText">Insights de Tests</h1>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          className="px-3 py-1 bg-gray-200 rounded"
          value={dateRange ?? 'all'}
          onChange={e => {
            setDateRange(e.target.value==='all'?null:+e.target.value);
            setPage(1);
          }}
        >
          {DATE_RANGES.map(r=>(
            <option key={r.label} value={r.days ?? 'all'}>{r.label}</option>
          ))}
        </select>
        <select
          className="px-3 py-1 bg-gray-200 rounded"
          value={typeFilter}
          onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
        >
          <option value="all">Todos los Tests</option>
          <option value="inicial">Inicial</option>
          <option value="seguimiento">Seguimiento</option>
        </select>
        <input
          type="text"
          className="px-3 py-1 border border-gray-300 rounded flex-1"
          placeholder="ID Paciente..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <span className="ml-auto text-gray-600">Total tests: <strong>{totalTests}</strong></span>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-gray-600">Promedio Ansiedad</p>
          <p className="text-3xl font-bold text-primaryText">{avgScores.anxiety}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-gray-600">Promedio Estrés</p>
          <p className="text-3xl font-bold text-primaryText">{avgScores.stress}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-gray-600">Tests por Tipo</p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={byType}>
              <XAxis dataKey="type" tick={{fontSize:12}}/>
              <YAxis hide/>
              <Tooltip/>
              <Bar dataKey="value" fill="#ea8bc5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de tendencia */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-xl font-semibold text-formTitle mb-4">Tendencia Diaria</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={dailyTrend}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date" tick={{fontSize:12}}/>
            <YAxis allowDecimals={false}/>
            <Tooltip/>
            <Legend verticalAlign="top"/>
            <Line type="monotone" dataKey="ansiedad" stroke="#6b85bb" name="Ansiedad"/>
            <Line type="monotone" dataKey="estres"   stroke="#58c9ec" name="Estrés"/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de tests (paginada) */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-tableHeaderBg text-white">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Paciente</th>
              <th className="px-3 py-2">Fecha</th>
              <th className="px-3 py-2">Ansiedad</th>
              <th className="px-3 py-2">Estrés</th>
              <th className="px-3 py-2">Tipo</th>
              <th className="px-3 py-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(t=>(
              <tr key={t.id} className="even:bg-gray-50 hover:bg-loginBg">
                <td className="px-3 py-2">{t.id}</td>
                <td className="px-3 py-2">{t.pacienteId}</td>
                <td className="px-3 py-2">{t.date}</td>
                <td className="px-3 py-2">{t.ansiedad}</td>
                <td className="px-3 py-2">{t.estres}</td>
                <td className="px-3 py-2 capitalize">{t.testType}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={()=>navigate(`/psych/test-results/${t.pacienteId}`)}
                    className="px-2 py-1 bg-primaryBtn text-white rounded hover:bg-primaryTextActive transition"
                  >
                    Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={()=>setPage(p=>Math.max(1,p-1))}
            disabled={page===1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            « Anterior
          </button>
          <span className="text-gray-600">Página {page} de {totalPages}</span>
          <button
            onClick={()=>setPage(p=>Math.min(totalPages,p+1))}
            disabled={page===totalPages}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Siguiente »
          </button>
        </div>
      </div>
    </div>
  );
}
