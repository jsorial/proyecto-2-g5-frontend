// src/pages/Patient/PatientProgress.jsx
import React, { useState, useEffect } from 'react';
import ProgressChart from '../../components/ProgressChart';

export default function PatientProgress() {
  // Datos simulados: en producción, llama a tu endpoint: /api/patient/{userId}/progress
  const [historicalData, setHistoricalData] = useState([]);
  const [tablaUltimos, setTablaUltimos] = useState([]);

  useEffect(() => {
    // Simular fetch
    const datos = [
      { fecha: '2025-01-15', ansiedad: 12, estres: 14 },
      { fecha: '2025-02-12', ansiedad: 10, estres: 12 },
      { fecha: '2025-03-10', ansiedad: 8,  estres: 9  },
      { fecha: '2025-04-08', ansiedad: 7,  estres: 8  },
      { fecha: '2025-05-06', ansiedad: 5,  estres: 6  },
      { fecha: '2025-06-05', ansiedad: 4,  estres: 5  }, // última evaluación
    ];
    setHistoricalData(datos);

    // Últimos 3 registros para tabla
    setTablaUltimos(datos.slice(-3).reverse());
  }, []);

  // Cálculos sencillos para tarjetas
  const ultimo = historicalData[historicalData.length - 1] || {};
  const promedioAnsiedad =
    historicalData.reduce((sum, d) => sum + d.ansiedad, 0) /
    (historicalData.length || 1);
  const promedioEstres =
    historicalData.reduce((sum, d) => sum + d.estres, 0) /
    (historicalData.length || 1);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Encabezado */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Tu Progreso en Salud Mental
        </h2>
        <p className="text-gray-600">
          Aquí puedes ver la evolución de tus puntajes de ansiedad y estrés,
          así como tus últimas evaluaciones.
        </p>
      </section>

      {/* Tarjetas de métricas */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center">
          <p className="text-gray-500 text-sm">Última Ansiedad</p>
          <p className="text-3xl font-bold text-green-600">
            {ultimo.ansiedad ?? 'N/A'}
          </p>
          <p className="text-gray-500 text-xs">({ultimo.fecha ?? '-'})</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center">
          <p className="text-gray-500 text-sm">Último Estrés</p>
          <p className="text-3xl font-bold text-blue-600">
            {ultimo.estres ?? 'N/A'}
          </p>
          <p className="text-gray-500 text-xs">({ultimo.fecha ?? '-'})</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center">
          <p className="text-gray-500 text-sm">Promedio Total</p>
          <p className="text-2xl font-bold text-gray-800">
            Ans: {Math.round(promedioAnsiedad * 10) / 10} | 
            Est: {Math.round(promedioEstres * 10) / 10}
          </p>
          <p className="text-gray-500 text-xs">
            ({historicalData.length} evaluaciones)
          </p>
        </div>
      </section>

      {/* Gráfico de evolución */}
      <section>
        {historicalData.length > 0 ? (
          <ProgressChart data={historicalData} />
        ) : (
          <p className="text-gray-600 text-center">
            No hay datos para mostrar el gráfico.
          </p>
        )}
      </section>

      {/* Últimas evaluaciones en tabla */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Últimas Evaluaciones
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left text-gray-700">Fecha</th>
                <th className="border px-4 py-2 text-left text-gray-700">Ansiedad</th>
                <th className="border px-4 py-2 text-left text-gray-700">Estrés</th>
              </tr>
            </thead>
            <tbody>
              {tablaUltimos.map((e) => (
                <tr key={e.fecha} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{e.fecha}</td>
                  <td className="border px-4 py-2 text-green-600 font-medium">
                    {e.ansiedad}
                  </td>
                  <td className="border px-4 py-2 text-blue-600 font-medium">
                    {e.estres}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
