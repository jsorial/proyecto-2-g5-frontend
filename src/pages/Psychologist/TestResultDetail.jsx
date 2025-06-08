// src/pages/Psychologist/TestResultDetail.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer
} from 'recharts';
import { API_URL_MIS_TEST_HISTORIAL, API_URL_PACIENTES } from '../../config';

export default function TestResultDetail() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest]         = useState(null);
  const [patient, setPatient]   = useState(null);

  useEffect(() => {
    fetch(`${API_URL_MIS_TEST_HISTORIAL}/tests.json`)
      .then(r=>r.json())
      .then(tests => {
        const t = tests.find(x=>x.id===+testId);
        setTest(t);
        return fetch(`${API_URL_PACIENTES}/patients.json`);
      })
      .then(r=>r.json())
      .then(pats => {
        setPatient(pats.find(p=>p.idDoc===test.pacienteId));
      })
      .catch(() => {
        import('../../data/tests.json').then(m=> {
          const t = m.default.find(x=>x.id===+testId);
          setTest(t);
          import('../../data/patients.json').then(m2=>{
            setPatient(m2.default.find(p=>p.idDoc===t.pacienteId));
          });
        });
      });
  }, [testId]);

  if (!test || !patient) {
    return <div className="flex items-center justify-center min-h-screen bg-fondo_fuera_formularios_dentro_del_body">
      <div className="w-16 h-16 border-4 border-formBtn border-t-primaryBtn rounded-full animate-spin"/>
    </div>;
  }

  const data = [
    { name: 'Ansiedad', value: test.ansiedad, fill: '#6b85bb' },
    { name: 'Estrés',   value: test.estres,   fill: '#58c9ec' }
  ];

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-12 px-8">
      {/* Header */}
      <div className="flex items-center max-w-4xl mx-auto mb-6">
        <img src="/images/Blue.png" alt="Blue" className="w-16 mr-4"/>
        <div>
          <h1 className="text-3xl font-bold text-primaryText">
            Test #{test.id} — {patient.nombres} {patient.apellidoPaterno}
          </h1>
          <p className="text-gray-600">Fecha: {test.date}</p>
        </div>
        <button
          onClick={()=>navigate(-1)}
          className="ml-auto focus:outline-none"
        >
          <img src="/images/Equis_de_cuestionarios.png" alt="Cerrar" className="h-10 w-10"/>
        </button>
      </div>

      {/* Gráfico radial */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-semibold text-formTitle mb-4 text-center">
          Puntuaciones
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <RadialBarChart
            cx="50%" cy="50%" innerRadius="60%" barSize={15}
            data={data} startAngle={180} endAngle={0}
          >
            <RadialBar minAngle={15} label={{ position:'insideStart', fill:'#fff' }} background clockWise dataKey="value"/>
            <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center"/>
            <Tooltip/>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* Detalles y recomendaciones */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-200 mt-6 space-y-4">
        <h3 className="text-formTitle font-semibold">Detalles del Test</h3>
        <p><strong>Tipo:</strong> {test.testType}</p>
        <p><strong>Comentarios:</strong> {test.comments || '—'}</p>

        <h3 className="text-formTitle font-semibold">Recomendaciones</h3>
        {test.ansiedad >24 && <p>😟 Ansiedad alta: Practica técnicas de respiración y mindfulness.</p>}
        {test.ansiedad>=18 && test.ansiedad<=24 && <p>🙂 Ansiedad moderada: Introduce pausas activas y seguimiento semanal.</p>}
        {test.ansiedad<=17 && <p>😌 Ansiedad baja: ¡Excelente! Mantén tus estrategias de autocuidado.</p>}
        {test.estres>24 && <p>😟 Estrés alto: Programa descansos frecuentes y ejercicios de relajación.</p>}
        {test.estres>=18 && test.estres<=24 && <p>🙂 Estrés moderado: Organiza tu agenda con prioridades y estiramientos.</p>}
        {test.estres<=17 && <p>😌 Estrés bajo: ¡Bien hecho! Continúa con tus buenos hábitos.</p>}
      </div>
    </div>
  );
}
