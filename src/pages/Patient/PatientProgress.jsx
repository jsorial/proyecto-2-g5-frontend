// src/pages/Patient/PatientProgress.jsx
import React, { useState, useEffect } from 'react';
import { API_URL_MIS_TEST_HISTORIAL, API_URL_MIS_CITAS } from '../../config';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const DATE_FILTERS = [
  { label: 'Último mes', days: 30 },
  { label: 'Últimos 3 meses', days: 90 },
  { label: 'Todo', days: null },
];

const METRIC_OPTIONS = [
  { value: 'all', label: 'Ambos' },
  { value: 'ansiedad', label: 'Ansiedad' },
  { value: 'estres', label: 'Estrés' },
];

export default function PatientProgress() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filteredHist, setFilteredHist] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [weeklyGoal, setWeeklyGoal] = useState({ done: 1, target: 3 });
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState(DATE_FILTERS[0]);
  const [metricFilter, setMetricFilter] = useState(METRIC_OPTIONS[0].value);

  // Para registro de ánimo
  const [moodEntry, setMoodEntry] = useState('');
  const [moodHistory, setMoodHistory] = useState(() => {
    const saved = localStorage.getItem('moodHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Carga inicial
  useEffect(() => {
    async function load() {
      try {
        const [hRes, cRes] = await Promise.all([
          fetch(`${API_URL_MIS_TEST_HISTORIAL}/tests.json`),
          fetch(`${API_URL_MIS_CITAS}/appointments.json`),
        ]);
        const hist = hRes.ok
          ? await hRes.json()
          : (await import('../../data/tests.json')).default;
        setHistory(hist);

        if (cRes.ok) {
          const citas = await cRes.json();
          const next = citas
            .filter(c => new Date(c.fecha) >= new Date())
            .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[0];
          setNextAppointment(next);
        }
      } catch {
        const local = (await import('../../data/tests.json')).default;
        setHistory(local);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Aplicar filtro de fecha
  useEffect(() => {
    if (!dateFilter.days) return setFilteredHist(history);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - dateFilter.days);
    setFilteredHist(history.filter(h => new Date(h.date) >= cutoff));
  }, [history, dateFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-fondo_fuera_formularios_dentro_del_body">
        <div className="w-16 h-16 border-4 border-formBtn border-t-primaryBtn rounded-full animate-spin" />
      </div>
    );
  }

  const last = history[history.length - 1] || {};
  const doneRatio = (weeklyGoal.done / weeklyGoal.target) * 100;

  // Guardar ánimo
  const saveMood = () => {
    if (!moodEntry.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    const updated = [...moodHistory, { date: today, text: moodEntry.trim() }];
    setMoodHistory(updated);
    localStorage.setItem('moodHistory', JSON.stringify(updated));
    setMoodEntry('');
    alert('¡Registro guardado! 👍');
  };

  // Marcar meta cumplida
  const markDone = () => {
    setWeeklyGoal(g => ({
      ...g,
      done: Math.min(g.done + 1, g.target)
    }));
  };

  // Datos para la gráfica según filtro de métrica
  const chartData = filteredHist.map(h => ({
    date: h.date,
    ...(metricFilter !== 'estres' && { ansiedad: h.ansiedad }),
    ...(metricFilter !== 'ansiedad' && { estres: h.estres }),
  }));

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-12 px-8">
      {/* Título con Avatar */}
      <div className="flex items-center mb-8">
        <img src="/images/Blue.png" alt="Blue" className="w-16 h-16 mr-4 animate-bounce-slow" />
        <h1 className="text-3xl font-bold text-primaryText">Mi Progreso</h1>
      </div>

      {/* Tarjetas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          {
            label: 'Última Evaluación',
            content: `Ans: ${last.ansiedad ?? '–'} · Estr: ${last.estres ?? '–'}`,
          },
          {
            label: 'Próxima Cita',
            content: nextAppointment
              ? `${new Date(nextAppointment.fecha).toLocaleDateString()} · ${nextAppointment.hora}`
              : '–',
          },
          {
            label: 'Meta Semanal',
            content: `${weeklyGoal.done}/${weeklyGoal.target} cumplidas`,
            action: markDone,
            actionLabel: '+1 cumplida'
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-primaryBtn p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-blancoBg text-sm">{card.label}</h3>
              {card.action && (
                <button
                  onClick={card.action}
                  className="text-blancoBg text-xs hover:underline"
                >
                  {card.actionLabel}
                </button>
              )}
            </div>
            <p className="text-2xl font-semibold text-negroBtn">{card.content}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="font-medium text-gray-700">Ver:</span>
        {DATE_FILTERS.map(f => (
          <button
            key={f.label}
            onClick={() => setDateFilter(f)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              dateFilter.label === f.label
                ? 'bg-formBtn text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {f.label}
          </button>
        ))}

        <span className="ml-6 font-medium text-gray-700">Métrica:</span>
        {METRIC_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => setMetricFilter(opt.value)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              metricFilter === opt.value
                ? 'bg-formBtn text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Gráfica */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h4 className="text-lg font-medium text-gray-700 mb-4">Evolución</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            {metricFilter !== 'estres' && (
              <Line type="monotone" dataKey="ansiedad" stroke="#6b85bb" dot={{ r: 3 }} name="Ansiedad"/>
            )}
            {metricFilter !== 'ansiedad' && (
              <Line type="monotone" dataKey="estres" stroke="#58c9ec" dot={{ r: 3 }} name="Estrés"/>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Historial en tabla */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h4 className="text-lg font-medium text-gray-700 mb-4">Historial de Evaluaciones</h4>
        <div className="overflow-y-auto max-h-64">
          <table className="w-full text-sm">
            <thead className="bg-progressBar text-white">
              <tr>
                <th className="px-3 py-2">Fecha</th>
                {metricFilter !== 'estres' && <th className="px-3 py-2">Ansiedad</th>}
                {metricFilter !== 'ansiedad' && <th className="px-3 py-2">Estrés</th>}
                <th className="px-3 py-2">Ver</th>
              </tr>
            </thead>
            <tbody>
              {filteredHist.map(entry => (
                <tr key={entry.date} className="even:bg-gray-50">
                  <td className="px-3 py-2">{entry.date}</td>
                  {metricFilter !== 'estres' && <td className="px-3 py-2">{entry.ansiedad}</td>}
                  {metricFilter !== 'ansiedad' && <td className="px-3 py-2">{entry.estres}</td>}
                  <td className="px-3 py-2">
                    <button
                      onClick={() => navigate(`/patient/test/${entry.date}`)}
                      className="px-2 py-1 bg-primaryBtn text-white rounded hover:bg-primaryTextActive text-xs"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registro de ánimo */}
      <div className="bg-primaryBtn p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div >
          <h5 className="text-blancoBg font-medium mb-2">Registro de Ánimo</h5>
          <textarea
            placeholder="¿Cómo te sientes hoy?"
            className="w-full h-28 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText resize-none"
            value={moodEntry}
            onChange={e => setMoodEntry(e.target.value)}
          />
          <button
            onClick={saveMood}
            className="mt-2 px-4 py-2 bg-formBtn text-white rounded-lg hover:bg-primaryTextActive transition"
          >
            Guardar Ánimo
          </button>
          <p className="text-xs text-blancoBg mt-2">
            Últimos: {moodHistory.slice(-3).map(m => m.date).join(', ') || '—'}
          </p>
        </div>

        {/* Meta semanal y progreso */}
        <div>
          <h5 className="text-blancoBg font-medium mb-2">Meta Semanal</h5>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="h-3 rounded-full bg-formBtn transition-width"
              style={{ width: `${doneRatio}%` }}
            />
          </div>
          <p className="text-sm text-blancoBg">
            {weeklyGoal.done} / {weeklyGoal.target} tareas completadas
          </p>
        </div>
      </div>

      {/* Acción extra */}
      <div className="text-center mb-12">
        <button
          onClick={() => navigate('/patient/schedule-extra')}
          className="px-6 py-3 bg-primaryBtn text-white rounded-lg hover:bg-primaryTextActive transition"
        >
          Agendar sesión extra
        </button>
      </div>
    </div>
  );
}
