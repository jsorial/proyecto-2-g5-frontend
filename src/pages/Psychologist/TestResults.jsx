// src/pages/Psychologist/TestResults.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { API_URL_MIS_TEST_HISTORIAL, API_URL_PACIENTES } from '../../config';

const categorize = v => (v <= 17 ? 'Bajo' : v <= 24 ? 'Moderado' : 'Alto');

export default function TestResults() {
  const { pacienteId: pidFromParams } = useParams();
  const pacienteId = pidFromParams || '12345678';  // ← demo fallback

  const navigate = useNavigate();
  const [test, setTest]       = useState(undefined);
  const [patient, setPatient] = useState(undefined);
  const [history, setHistory] = useState([]);

  // 1) Cargar tests y quedarnos con el más reciente de este paciente
  useEffect(() => {
    fetch(`${API_URL_MIS_TEST_HISTORIAL}/tests.json`)
      .then(r => r.json())
      .then(tests => {
        setHistory(tests);
        const propios = tests
          .filter(t => t.pacienteId === pacienteId)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setTest(propios[0] || null);
      })
      .catch(() => import('../../data/tests.json').then(m => {
        const tests = m.default;
        setHistory(tests);
        const propios = tests
          .filter(t => t.pacienteId === pacienteId)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setTest(propios[0] || null);
      }));
  }, [pacienteId]);

  // 2) Cargar datos del paciente una vez sepamos test
  useEffect(() => {
    if (test === undefined) return;
    fetch(`${API_URL_PACIENTES}/patients.json`)
      .then(r => r.json())
      .then(pats => setPatient(pats.find(p => p.idDoc === pacienteId) || null))
      .catch(() => import('../../data/patients.json').then(m => {
        setPatient(m.default.find(p => p.idDoc === pacienteId) || null);
      }));
  }, [test, pacienteId]);

  // 3) Spinner de carga
  if (test === undefined || patient === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-fondo_fuera_formularios_dentro_del_body">
        <div className="w-16 h-16 border-4 border-formBtn border-t-primaryBtn rounded-full animate-spin" />
      </div>
    );
  }

  // 4) Si no hay tests para este paciente
  if (test === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-fondo_fuera_formularios_dentro_del_body px-4">
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200 max-w-md text-center">
          <img src="/images/Blue.png" alt="Blue" className="w-24 mx-auto mb-4 animate-bounce-slow"/>
          <h2 className="text-2xl font-semibold text-formTitle mb-2">
            No se encontraron tests para el paciente {pacienteId}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-primaryBtn text-white rounded hover:bg-primaryTextActive transition"
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  // 5) Preparar datos históricos para gráfica
  const patientHistory = history
    .filter(t => t.pacienteId === pacienteId)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(t => ({ date: t.date, ansiedad: t.ansiedad, estres: t.estres }));

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-12 px-4">
      {/* Hero con título y paciente */}
      <div className="relative max-w-4xl mx-auto flex items-center bg-white p-6 rounded-lg shadow mb-8">
        <img src="/images/Blue.png" alt="Blue" className="w-20 h-auto mr-6 animate-fade-in" />
        <div>
          <h1 className="text-3xl font-bold text-primaryText">
            Detalle del Test Psicométrico
          </h1>
          <p className="text-gray-700">
            Paciente: <strong>{patient.nombres} {patient.apellidoPaterno}</strong> ({patient.idDoc})
          </p>
          <p className="text-gray-700">Fecha del test: {test.date}</p>
        </div>
        <button
          onClick={() => navigate('/psych/progress')}
          className="absolute top-4 right-4 focus:outline-none"
          aria-label="Cerrar"
        >
          <img src="/images/Equis_de_cuestionarios.png" alt="Cerrar" className="w-10 h-10"/>
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-200 space-y-8">
        {/* Puntajes actuales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-loginBg border border-primaryBtn rounded-lg">
            <p className="text-primaryText font-medium text-lg">
              Ansiedad: {test.ansiedad} pts
            </p>
            <p className="text-gray-700">Categoría: {categorize(test.ansiedad)}</p>
          </div>
          <div className="p-4 bg-loginBg border border-primaryBtn rounded-lg">
            <p className="text-primaryText font-medium text-lg">
              Estrés: {test.estres} pts
            </p>
            <p className="text-gray-700">Categoría: {categorize(test.estres)}</p>
          </div>
        </div>

        {/* Comentarios y tipo */}
        <div className="space-y-2">
          <h3 className="text-formTitle font-semibold text-lg">Comentarios</h3>
          <p className="text-gray-700">{test.comments || '— Sin comentarios —'}</p>
          <p className="text-sm text-gray-500">Tipo de test: <em>{test.testType}</em></p>
        </div>

        {/* Gráfica histórica */}
        <div>
          <h3 className="text-formTitle font-semibold mb-4">Evolución Histórica</h3>
          {patientHistory.length > 1 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={patientHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Line type="monotone" dataKey="ansiedad" stroke="#6b85bb" name="Ansiedad" />
                <Line type="monotone" dataKey="estres" stroke="#58c9ec" name="Estrés" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-600">No hay suficientes datos para graficar.</p>
          )}
        </div>

        {/* Recomendaciones */}
        <div className="space-y-3">
          <h3 className="text-formTitle font-semibold text-lg">Recomendaciones</h3>
          {test.ansiedad > 24 && (
            <p>😟 <strong>Alta ansiedad:</strong> sugiere ejercicio de respiración diafragmática y mindfulness.</p>
          )}
          {test.ansiedad >= 18 && test.ansiedad <= 24 && (
            <p>🙂 <strong>Ansiedad moderada:</strong> realizar pausas activas y práctica de relajación.</p>
          )}
          {test.ansiedad <= 17 && (
            <p>😌 <strong>Ansiedad baja:</strong> ¡mantener buenas prácticas de autocuidado!</p>
          )}
          {test.estres > 24 && (
            <p>😟 <strong>Alto estrés:</strong> recomienda descansos regulares y actividades recreativas.</p>
          )}
          {test.estres >= 18 && test.estres <= 24 && (
            <p>🙂 <strong>Estrés moderado:</strong> incorporar estiramientos y gestión de agenda.</p>
          )}
          {test.estres <= 17 && (
            <p>😌 <strong>Estrés bajo:</strong> ¡excelente! continuar con hábitos saludables.</p>
          )}
        </div>
      </div>
    </div>
  );
}
