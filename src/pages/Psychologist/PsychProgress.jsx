// src/pages/Psychologist/PsychProgress.jsx
import React, { useState, useEffect } from 'react';
import ProgressChart from '../../components/ProgressChart';

// Datos de ejemplo para observaciones
const OBSERVACIONES_SIMULADAS = [
  {
    fecha: '2025-06-03',
    paciente: 'Juan Carlos Pérez',
    nota: 'Se observa reducción de nerviosismo al compartir experiencias.',
  },
  {
    fecha: '2025-05-28',
    paciente: 'María Fernanda López',
    nota: 'Mejor respuesta en ejercicios de relajación, ansiedad moderada.',
  },
  {
    fecha: '2025-05-15',
    paciente: 'Carlos Ruiz',
    nota: 'Estrés alto debido a problemas laborales; iniciar terapia de respiración.',
  },
];

export default function PsychProgress() {
  // Simular fetch de promedios mensuales de ansiedad/estrés de todos los pacientes
  const [promediosMensuales, setPromediosMensuales] = useState([]);
  const [observaciones, setObservaciones] = useState([]);

  useEffect(() => {
    // Datos simulados (por mes) para todos los pacientes:
    const datosMeses = [
      { fecha: '2025-01-01', ansiedad: 11, estres: 12 },
      { fecha: '2025-02-01', ansiedad: 10, estres: 11 },
      { fecha: '2025-03-01', ansiedad: 9,  estres: 10 },
      { fecha: '2025-04-01', ansiedad: 8,  estres: 9  },
      { fecha: '2025-05-01', ansiedad: 7,  estres: 8  },
      { fecha: '2025-06-01', ansiedad: 6,  estres: 7  }, // mes actual
    ];
    setPromediosMensuales(datosMeses);

    // Observaciones recientes:
    setObservaciones(OBSERVACIONES_SIMULADAS);
  }, []);

  // Calcular estadísticas generales
  const totalPacientes = 24; // simulado
  const citasCanceladasMes = 3; // simulado

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Encabezado */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Progreso General de Pacientes
        </h2>
        <p className="text-gray-600">
          Aquí puedes ver las tendencias de ansiedad y estrés en tu grupo de pacientes, 
          así como las últimas notas clínicas.
        </p>
      </section>

      {/* Tarjetas de estadísticas globales */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center">
          <p className="text-gray-500 text-sm">Total Pacientes</p>
          <p className="text-3xl font-bold text-green-600">{totalPacientes}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center">
          <p className="text-gray-500 text-sm">Citas Canceladas (este mes)</p>
          <p className="text-3xl font-bold text-red-600">{citasCanceladasMes}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center">
          <p className="text-gray-500 text-sm">Promedio Ansiedad Últ. Mes</p>
          <p className="text-3xl font-bold text-green-700">
            {promediosMensuales.slice(-1)[0]?.ansiedad ?? '–'}
          </p>
        </div>
      </section>

      {/* Gráfico de promedios mensuales */}
      <section>
        {promediosMensuales.length > 0 ? (
          <ProgressChart data={promediosMensuales} />
        ) : (
          <p className="text-gray-600 text-center">
            No hay datos de promedios mensuales.
          </p>
        )}
      </section>

      {/* Tabla de Observaciones Clínicas */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Últimas Observaciones Clínicas
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left text-gray-700">Fecha</th>
                <th className="border px-4 py-2 text-left text-gray-700">Paciente</th>
                <th className="border px-4 py-2 text-left text-gray-700">Observación</th>
              </tr>
            </thead>
            <tbody>
              {observaciones.map((obs, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{obs.fecha}</td>
                  <td className="border px-4 py-2">{obs.paciente}</td>
                  <td className="border px-4 py-2 text-gray-700">{obs.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
