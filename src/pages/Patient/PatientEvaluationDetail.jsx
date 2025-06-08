// src/pages/Patient/PatientEvaluationDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import historial from '../../data/historial.json'; // array de {date, ansiedad, estres, respuestas…}

export default function PatientEvaluationDetail() {
  const { date } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const e = historial.find(h => h.date === date);
    setEntry(e || null);
  }, [date]);

  if (!entry) return <p className="p-6">Evaluación no encontrada.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">
        Detalle Evaluación — {entry.date}
      </h2>
      <p><strong>Ansiedad:</strong> {entry.ansiedad}</p>
      <p><strong>Estrés:</strong> {entry.estres}</p>
      {/* Si guardas respuestas: */}
      {entry.respuestas && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Respuestas:</h3>
          <ul className="list-disc list-inside">
            {Object.entries(entry.respuestas).map(([qid, resp]) => (
              <li key={qid}>
                Pregunta {qid}: {resp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
