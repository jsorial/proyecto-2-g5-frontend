// src/components/MixedPsychometricTest.jsx
import React, { useState } from 'react';

const QUESTIONS = [
  // --- Ansiedad: ítems cerrados ---
  { id: 1,  type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has sentido nerviosismo o inquietud?' },
  { id: 2,  type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te ha costado dejar de preocuparte?' },
  { id: 3,  type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has sentido tan inquieto/a que no podías quedarte quieto/a?' },
  { id: 4,  type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has tenido dificultades para relajarte?' },
  // Ítem abierto para ansiedad:
  { id: 5,  type: 'texto',  text: 'Describe, en tus palabras, una situación reciente en la que sentiste ansiedad fuerte.' },
  // Más ítems cerrados de ansiedad:
  { id: 6,  type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia sientes que la ansiedad interfiere en tus actividades diarias?' },
  { id: 7,  type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has sentido palpitaciones o tensión muscular relacionadas a la ansiedad?' },
  { id: 8,  type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has tenido dificultad para conciliar el sueño a causa de pensamientos ansiosos?' },
  { id: 9,  type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has sentido que tu respiración se acelera por problemas emocionales?' },
  // Ítem abierto adicional:
  { id: 10, type: 'texto',  text: '¿Qué crees que desencadena tu ansiedad y cómo lo afrontas?' },

  // --- Estrés: ítems cerrados ---
  { id: 11, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has sentido incapaz de controlar lo que sucede en tu vida?' },
  { id: 12, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has sentido nervioso(a) y estresado(a)?' },
  { id: 13, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has sentido que las dificultades se amontonan y no puedes superarlas?' },
  { id: 14, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has sentido abrumado(a) por tus responsabilidades?' },
  // Ítem abierto para estrés:
  { id: 15, type: 'texto',  text: 'Describe qué actividades o situaciones te generan más estrés en tu día a día.' },
  // Más ítems cerrados de estrés:
  { id: 16, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia la espera de tu cita aumentó tu nivel de estrés?' },
  { id: 17, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has sentido tenso(a) mientras esperabas resultados de tu evaluación?' },
  { id: 18, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has sentido que tu familia o trabajo contribuye a tu estrés?' },
  { id: 19, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has preocupado por tu desempeño en la terapia o tareas asignadas?' },
  // Ítem abierto final:
  { id: 20, type: 'texto',  text: '¿Qué actividades haces para relajarte entre sesiones y qué tan efectivas consideras que son?' },
];

// Opciones de la escala Likert
const LIKERT_OPTIONS = [
  { value: 1, label: 'Nunca' },
  { value: 2, label: 'Casi nunca' },
  { value: 3, label: 'Algunas veces' },
  { value: 4, label: 'Frecuentemente' },
  { value: 5, label: 'Casi siempre' },
];

export default function MixedPsychometricTest() {
  // step: 0..3 = bloques de preguntas; 4 = pantalla de resultados
  const [step, setStep] = useState(0);
  // currentBlock: 0..3
  const [currentBlock, setCurrentBlock] = useState(0);
  // Respuestas (likert:number, texto:string)
  const [answers, setAnswers] = useState({});
  // Loader mientras invocamos ML
  const [loading, setLoading] = useState(false);
  // Resultados backend
  const [resultados, setResultados] = useState(null);
  // Gamificación: mensaje “¡Bien hecho!”
  const [showCongrats, setShowCongrats] = useState(false);

  // Preguntas del bloque actual
  const startIndex = currentBlock * 5;
  const endIndex = startIndex + 5;
  const blockQuestions = QUESTIONS.slice(startIndex, endIndex);
  const totalBlocks = Math.ceil(QUESTIONS.length / 5); // 4 bloques

  // Manejar cambio de respuesta
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Validar que el bloque esté completo
  const isBlockValid = () => {
    return blockQuestions.every((q) => {
      const resp = answers[q.id];
      if (q.type === 'likert') {
        return resp >= 1 && resp <= 5;
      } else if (q.type === 'texto') {
        return typeof resp === 'string' && resp.trim().length >= 10;
      }
      return false;
    });
  };

  // Avanzar de bloque
  const handleNext = () => {
    if (!isBlockValid()) {
      alert('Por favor completa todas las preguntas (texto ≥ 10 caracteres) antes de continuar.');
      return;
    }
    setShowCongrats(true);
    setTimeout(() => {
      setShowCongrats(false);
      setCurrentBlock((prev) => prev + 1);
    }, 1200);
  };

  // Retroceder de bloque
  const handlePrev = () => {
    if (currentBlock > 0) {
      setCurrentBlock((prev) => prev - 1);
    }
  };

  // Enviar respuestas a backend (Random Forest + SVM)
  const handleSubmit = async () => {
    if (!isBlockValid()) {
      alert('Por favor completa todas las preguntas antes de enviar.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('https://TU_API_GATEWAY_URL/api/cuestionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${TU_JWT}`  // Si usas JWT
        },
        body: JSON.stringify({ respuestas: answers })
      });
      if (!response.ok) throw new Error('Error al procesar el test');
      const data = await response.json();
      setResultados(data);
      setStep(4);
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al procesar tus respuestas. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Contar respuestas completadas para la barra de progreso
  const questionsAnsweredCount = QUESTIONS.filter((q) => {
    const resp = answers[q.id];
    if (q.type === 'likert') return resp >= 1 && resp <= 5;
    if (q.type === 'texto') return typeof resp === 'string' && resp.trim().length >= 10;
    return false;
  }).length;
  const progressPercent = Math.round((questionsAnsweredCount / QUESTIONS.length) * 100);

  // --- Muestra Spinner si loading === true ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-green-700 font-medium">Analizando tus respuestas…</p>
      </div>
    );
  }

  // --- Pantalla de Resultados (step === 4) ---
  if (step === 4 && resultados) {
    const { puntajeAnsiedad, puntajeEstres, comentariosExtra } = resultados;
    const categorize = (score) => {
      if (score <= 17) return 'Bajo';
      if (score <= 24) return 'Moderado';
      return 'Alto';
    };
    const categoriaAnsiedad = categorize(puntajeAnsiedad);
    const categoriaEstres   = categorize(puntajeEstres);

    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Resultados de tu Evaluación
        </h2>

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
          <p className="text-green-700 text-lg">
            <strong>Ansiedad:</strong> {puntajeAnsiedad} puntos ({categoriaAnsiedad})
          </p>
          <p className="text-green-700 text-lg">
            <strong>Estrés:</strong> {puntajeEstres} puntos ({categoriaEstres})
          </p>
        </div>

        {comentariosExtra?.ansiedadKeywords && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
            <h3 className="text-blue-700 font-medium mb-2">Palabras clave (Ansiedad):</h3>
            <p className="text-blue-600">{comentariosExtra.ansiedadKeywords.join(', ')}</p>
          </div>
        )}
        {comentariosExtra?.estresKeywords && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
            <h3 className="text-blue-700 font-medium mb-2">Palabras clave (Estrés):</h3>
            <p className="text-blue-600">{comentariosExtra.estresKeywords.join(', ')}</p>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
          <h3 className="text-gray-800 font-medium mb-2">Recomendaciones</h3>
          {puntajeAnsiedad > 24 && (
            <p className="text-gray-700 mb-2">
              😟 Tu nivel de ansiedad es alto. Te sugerimos practicar ejercicios de respiración profunda y agendar una cita con tu psicólogo.
            </p>
          )}
          {puntajeAnsiedad >= 18 && puntajeAnsiedad <= 24 && (
            <p className="text-gray-700 mb-2">
              🙂 Tu nivel de ansiedad es moderado. Practica técnicas de relajación y mantén contacto con tu terapeuta.
            </p>
          )}
          {puntajeAnsiedad <= 17 && (
            <p className="text-gray-700 mb-2">
              😌 Tu nivel de ansiedad es bajo. ¡Excelente! Continúa con tus hábitos de autocuidado.
            </p>
          )}

          {puntajeEstres > 24 && (
            <p className="text-gray-700 mb-2">
              😟 Tu nivel de estrés es alto. Tómate descansos activos y organiza tu agenda para reducir la carga.
            </p>
          )}
          {puntajeEstres >= 18 && puntajeEstres <= 24 && (
            <p className="text-gray-700 mb-2">
              🙂 Tu nivel de estrés es moderado. Realiza estiramientos breves y prioriza tus actividades.
            </p>
          )}
          {puntajeEstres <= 17 && (
            <p className="text-gray-700 mb-2">
              😌 Tu nivel de estrés es bajo. ¡Bien hecho! Sigue con tus buenas prácticas de descanso.
            </p>
          )}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="block mx-auto px-6 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition"
        >
          Volver a Empezar
        </button>
      </div>
    );
  }

  // --- Pantalla de Bloques de Preguntas (step 0..3) ---
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Test Psicométrico de Ansiedad y Estrés
      </h2>

      {/* Barra de progreso */}
      <div className="flex items-center mb-4">
        <progress
          value={questionsAnsweredCount}
          max={QUESTIONS.length}
          className="w-full h-4 accent-green-400"
        />
        <span className="w-16 text-right text-gray-600 font-medium">
          {progressPercent}%
        </span>
      </div>

      {/* Mensaje de felicitación */}
      {showCongrats && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-center font-medium">
          <span className="mr-2">🎉</span>
          Ya completaste {(currentBlock + 1) * 25}% del test.
        </div>
      )}

      {/* Preguntas del bloque actual */}
      <div className="mb-6">
        <p className="text-gray-700 mb-3 font-medium">
          Bloque {currentBlock + 1} de {totalBlocks}
        </p>
        {blockQuestions.map((q) => (
          <div key={q.id} className="mb-6">
            <label htmlFor={`q_${q.id}`} className="block text-gray-800 font-medium mb-2">
              {q.text}
            </label>
            {q.type === 'likert' ? (
              <div className="flex flex-col gap-2">
                {LIKERT_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 text-gray-700">
                    <input
                      id={`q_${q.id}_${opt.value}`}
                      type="radio"
                      name={`q_${q.id}`}
                      value={opt.value}
                      checked={answers[q.id] === opt.value}
                      onChange={() => handleAnswerChange(q.id, opt.value)}
                      className="form-radio h-5 w-5 text-green-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                id={`q_${q.id}`}
                rows={4}
                placeholder="Escribe al menos 10 caracteres..."
                value={answers[q.id] || ''}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-700"
              />
            )}
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentBlock === 0 || showCongrats}
          className={`px-5 py-2 rounded-lg font-medium transition 
            ${currentBlock === 0 || showCongrats
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'}
          `}
        >
          « Anterior
        </button>

        {currentBlock < totalBlocks - 1 ? (
          <button
            onClick={handleNext}
            disabled={showCongrats}
            className={`px-5 py-2 rounded-lg font-medium transition 
              ${showCongrats
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'}
            `}
          >
            Siguiente »
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={showCongrats}
            className={`px-6 py-2 rounded-lg font-medium transition 
              ${showCongrats
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'}
            `}
          >
            Enviar Resultados
          </button>
        )}
      </div>
    </div>
  );
}
