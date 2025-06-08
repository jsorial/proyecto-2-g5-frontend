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

export default function PatientProgress() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filteredHist, setFilteredHist] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [weeklyGoal, setWeeklyGoal] = useState({ done: 1, target: 3 });
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState(DATE_FILTERS[0]);

  // Estados nuevos:

  const [moodEntry, setMoodEntry] = useState('');
  const [moodHistory, setMoodHistory] = useState(() => {
    // cargar de localStorage o API
    const saved = localStorage.getItem('moodHistory');
    return saved ? JSON.parse(saved) : [];
  });
  // Carga datos
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

  // Filtra según dateFilter
  useEffect(() => {
    if (!dateFilter.days) {
      setFilteredHist(history);
      return;
    }
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
  const totalBlocks = Math.ceil(filteredHist.length / 1);
  const answeredCount = filteredHist.length;

  // Guardar estado de ánimo en localStorage (o enviar a API)
  const saveMood = () => {
    if (!moodEntry.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    const updated = [...moodHistory, { date: today, text: moodEntry.trim() }];
    setMoodHistory(updated);
    localStorage.setItem('moodHistory', JSON.stringify(updated));
    setMoodEntry('');
    alert('¡Registro guardado! 👍');
  };

  // Marcar una meta cumplida
  const markDone = () => {
    setWeeklyGoal(g => {
      const done = Math.min(g.done + 1, g.target);
      return { ...g, done };
    });
  };

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-12 px-8">
      <h1 className="text-3xl font-bold text-primaryText mb-8">Mi Progreso</h1>

      {/* Cards superiores */}
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
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-[#f5f5f5] p-6 rounded-lg shadow border border-gray-200
                       hover:shadow-lg hover:-translate-y-1 transition-transform"
          >
            <h3 className="text-gray-600 text-sm">{card.label}</h3>
            <p className="mt-2 text-2xl font-semibold text-formTitle">
              {card.content}
            </p>
          </div>
        ))}
      </div>

      {/* Filtro de fechas */}
      <div className="flex items-center mb-4 space-x-4">
        <span className="font-medium text-gray-700">Ver:</span>
        {DATE_FILTERS.map(f => (
          <button
            key={f.label}
            onClick={() => setDateFilter(f)}
            className={`
              px-3 py-1 rounded-full text-sm transition
              ${dateFilter.label === f.label
                ? 'bg-formBtn text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Gráfica */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8">
        <h4 className="text-lg font-medium text-gray-700 mb-4">Evolución en el tiempo</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={filteredHist}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="ansiedad" stroke="#6b85bb" dot={{ r: 3 }} />
            <Line type="monotone" dataKey="estres" stroke="#58c9ec" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8">
        <h4 className="text-lg font-medium text-gray-700 mb-4">Historial de Evaluaciones</h4>
        <div className="overflow-y-auto max-h-64">
          <table className="w-full table-auto border-collapse text-sm">
            <thead className="bg-progressBar text-white">
              <tr>
                <th className="px-3 py-2">Fecha</th>
                <th className="px-3 py-2">Ansiedad</th>
                <th className="px-3 py-2">Estrés</th>
                <th className="px-3 py-2">Ver</th>
              </tr>
            </thead>
            <tbody>
              {filteredHist.map(entry => (
                <tr key={entry.date} className="even:bg-gray-50">
                  <td className="px-3 py-2">{entry.date}</td>
                  <td className="px-3 py-2">{entry.ansiedad}</td>
                  <td className="px-3 py-2">{entry.estres}</td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => navigate(`/patient/test/${entry.date}`)}
                      className="px-2 py-1 bg-primaryBtn text-white text-xs rounded hover:bg-primaryTextActive"
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

      {/* Panel Bienestar */}
      <div className="bg-[#f5f5f5] p-6 rounded-lg shadow border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 1) Metas Semanales */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-gray-700 font-medium">Metas Semanales</h5>
            <button
              onClick={markDone}
              className="text-sm text-formBtn hover:underline"
            >
              + 1 cumplida
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-formBtn transition-width"
              style={{ width: `${(weeklyGoal.done / weeklyGoal.target) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {weeklyGoal.done} / {weeklyGoal.target} tareas
          </p>
        </div>

        {/* 2) Registro de Ánimo */}
        <div className="flex flex-col">
          <h5 className="text-gray-700 font-medium mb-2">Registro de Ánimo</h5>
          <textarea
            placeholder="¿Cómo te sientes hoy?"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText mb-2 resize-none"
            value={moodEntry}
            onChange={e => setMoodEntry(e.target.value)}
          />
          <button
            onClick={saveMood}
            className="self-end px-4 py-2 bg-formBtn text-white rounded-lg hover:bg-primaryTextActive transition"
          >
            Guardar
          </button>
          <small className="text-gray-500 mt-2">
            Últimos registros: {moodHistory.slice(-3).map(m => m.date).join(', ') || '—'}
          </small>
        </div>
      </div>

      {/* Botón acción */}
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
