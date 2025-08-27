// src/pages/Patient//PatientPsychometricResults.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { API_URL_MIS_TEST_HISTORIAL } from '../../config';

const categorize = v => (v <= 17 ? 'Bajo' : v <= 24 ? 'Moderado' : 'Alto');

export default function PatientPsychometricResults({ puntajeAnsiedad, puntajeEstres }) {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL_MIS_TEST_HISTORIAL}/history.json`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setHistory(data))
      .catch(() => {
        // fallback
        setHistory([
          { date: '2025-03-01', ansiedad: 25, estres: 23 },
          { date: '2025-04-01', ansiedad: 20, estres: 18 },
          { date: '2025-05-01', ansiedad: 18, estres: 17 },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Añadimos el test actual al historial
  const fullHistory = [
    ...history,
    { date: new Date().toLocaleDateString('es-PE'), ansiedad: puntajeAnsiedad, estres: puntajeEstres }
  ];

  // Calculamos mejora vs penúltimo
  let mejoraAns = 0, mejoraEstr = 0;
  if (history.length) {
    const prev = history[history.length - 1];
    mejoraAns = prev.ansiedad - puntajeAnsiedad;
    mejoraEstr = prev.estres - puntajeEstres;
  }

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-12">
      {/* Hero */}
      <div className="relative max-w-6xl mx-auto mb-8 flex items-center bg-white border border-primaryBtn p-6 rounded-lg">
        <img src="/images/Blue.png" alt="Blue" className="w-24 h-auto animate-bounce-slow" />
        <div>
          <h1 className="text-3xl font-bold text-primaryText">Resultado del Test</h1>
          <p className="mt-1 text-gray-600">
            Ansiedad: <strong>{puntajeAnsiedad}</strong> · Estrés: <strong>{puntajeEstres}</strong>
          </p>
          {history.length > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              Última: {history[history.length - 1].date}
            </p>
          )}
        </div>
        <button
          onClick={() => navigate('/patient/home')}
          aria-label="Cerrar Resultados de Test"
          className="absolute top-4 right-2 bg-white rounded-full p-1 hover:bg-gray-100 transition"
        >
          <img
            src="/images/Equis_de_cuestionarios.png"
            alt="Cerrar"
            className="h-14 w-14"
          />
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Gráfico */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-formTitle mb-4">Evolución en el tiempo</h2>
          {loading
            ? <p className="text-center text-gray-500">Cargando datos...</p>
            : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fullHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend verticalAlign="top" />
                  <Line type="monotone" dataKey="ansiedad" stroke="#6b85bb" name="Ansiedad" />
                  <Line type="monotone" dataKey="estres" stroke="#58c9ec" name="Estrés" />
                </LineChart>
              </ResponsiveContainer>
            )
          }

          
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-primaryBtn rounded-lg shadow border border-black">
            <p className="text-lg text-white font-medium">
              Ansiedad: {puntajeAnsiedad} pts ({categorize(puntajeAnsiedad)})
            </p>
            {history.length > 0 && (
              <p className={`mt-2 font-medium ${mejoraAns > 0 ? 'text-black-600' : 'text-white-600'}`}>
                {mejoraAns > 0
                  ? `Mejoraste ${mejoraAns} pts vs prev.`
                  : `Subiste ${-mejoraAns} pts vs prev.`}
              </p>
            )}
          </div>
          <div className="p-6 bg-primaryBtn rounded-lg shadow border border-black">
            <p className="text-lg text-white font-medium">
              Estrés: {puntajeEstres} pts ({categorize(puntajeEstres)})
            </p>
            {history.length > 0 && (
              <p className={`mt-2 font-medium ${mejoraEstr > 0 ? 'text-black-600' : 'text-white-600'}`}>
                {mejoraEstr > 0
                  ? `Mejoraste ${mejoraEstr} pts vs prev.`
                  : `Subiste ${-mejoraEstr} pts vs prev.`}
              </p>
            )}
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-formTitle font-semibold mb-4">Recomendaciones</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {puntajeAnsiedad > 24 && (
              <li>😟 <strong>Ansiedad alta:</strong> Prueba respiración diafragmática y sesiones breves de mindfulness.</li>
            )}
            {puntajeAnsiedad >= 18 && puntajeAnsiedad <= 24 && (
              <li>🙂 <strong>Ansiedad moderada:</strong> Incorpora pausas activas y mantén contacto con tu terapeuta.</li>
            )}
            {puntajeAnsiedad <= 17 && (
              <li>😌 <strong>Ansiedad baja:</strong> ¡Excelente! Sigue con tus hábitos de autocuidado.</li>
            )}
            {puntajeEstres > 24 && (
              <li>😟 <strong>Estrés alto:</strong> Programa descansos regulares y actividades recreativas.</li>
            )}
            {puntajeEstres >= 18 && puntajeEstres <= 24 && (
              <li>🙂 <strong>Estrés moderado:</strong> Practica estiramientos y prioriza tus tareas.</li>
            )}
            {puntajeEstres <= 17 && (
              <li>😌 <strong>Estrés bajo:</strong> ¡Bien hecho! Continúa reforzando tus buenos hábitos.</li>
            )}
          </ul>
        </div>

        {/* Historial detallado */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">

          <h3 className="text-formTitle font-semibold mb-4">Historial de Evaluaciones</h3>

          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead className="bg-tableHeaderBg">
                <tr>
                  <th className="px-4 py-2 text-white">Fecha</th>
                  <th className="px-4 py-2 text-white">Ansiedad</th>
                  <th className="px-4 py-2 text-white">Estrés</th>
                  <th className="px-4 py-2 text-center text-white">Acción</th>
                </tr>
              </thead>
              <tbody>
                {fullHistory.map((row, idx) => (
                  <tr key={idx} className="hover:bg-loginBg transition">
                    <td className="px-4 py-2">{row.date}</td>
                    <td className="px-4 py-2">{row.ansiedad}</td>
                    <td className="px-4 py-2">{row.estres}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => alert(`Detalles de ${row.date}`)}
                        className="px-3 py-1 bg-formBtn text-white rounded hover:bg-primaryTextActive transition"
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

        {/* Botón opcional de encuesta de satisfacción */}
      <div className="max-w-6xl mx-auto mt-8 text-center">
       <button
         onClick={() => navigate('/patient/survey')}
          className="px-6 py-3 bg-formBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
       >
         Evaluar satisfacción (opcional)
       </button>
     </div>

      </div>
    </div>
  );
}