// src/components/MixedPsychometricTest.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <— Importar useNavigate

const QUESTIONS = [
  // --- Ansiedad: ítems cerrados ---
  { id: 1, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has sentido nerviosismo o inquietud?' },
  { id: 2, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te ha costado dejar de preocuparte?' },
  { id: 3, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has sentido tan inquieto/a que no podías quedarte quieto/a?' },
  { id: 4, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has tenido dificultades para relajarte?' },
  // Ítem abierto para ansiedad:
  { id: 5, type: 'texto', text: 'Describe, en tus palabras, una situación reciente en la que sentiste ansiedad fuerte.' },
  // Más ítems cerrados de ansiedad:
  { id: 6, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia sientes que la ansiedad interfiere en tus actividades diarias?' },
  { id: 7, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has sentido palpitaciones o tensión muscular relacionadas a la ansiedad?' },
  { id: 8, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has tenido dificultad para conciliar el sueño a causa de pensamientos ansiosos?' },
  { id: 9, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has sentido que tu respiración se acelera por problemas emocionales?' },
  // Ítem abierto adicional:
  { id: 10, type: 'texto', text: '¿Qué crees que desencadena tu ansiedad y cómo lo afrontas?' },

  // --- Estrés: ítems cerrados ---
  { id: 11, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has sentido incapaz de controlar lo que sucede en tu vida?' },
  { id: 12, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has sentido nervioso(a) y estresado(a)?' },
  { id: 13, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has sentido que las dificultades se amontonan y no puedes superarlas?' },
  { id: 14, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has sentido abrumado(a) por tus responsabilidades?' },
  // Ítem abierto para estrés:
  { id: 15, type: 'texto', text: 'Describe qué actividades o situaciones te generan más estrés en tu día a día.' },
  // Más ítems cerrados de estrés:
  { id: 16, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia la espera de tu cita aumentó tu nivel de estrés?' },
  { id: 17, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has sentido tenso(a) mientras esperabas resultados de tu evaluación?' },
  { id: 18, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia has sentido que tu familia o trabajo contribuye a tu estrés?' },
  { id: 19, type: 'likert', text: 'En las últimas dos semanas, ¿con qué frecuencia te has preocupado por tu desempeño en la terapia o tareas asignadas?' },
  // Ítem abierto final:
  { id: 20, type: 'texto', text: '¿Qué actividades haces para relajarte entre sesiones y qué tan efectivas consideras que son?' },
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
  const navigate = useNavigate(); // <— Hook para redirigir
  const [currentBlock, setCurrentBlock] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);

  // Dividir en bloques de 5 preguntas
  const startIndex = currentBlock * 5;
  const endIndex = startIndex + 5;
  const blockQuestions = QUESTIONS.slice(startIndex, endIndex);
  const totalBlocks = Math.ceil(QUESTIONS.length / 5);

  // Contar respuestas válidas
  const questionsAnsweredCount = QUESTIONS.filter((q) => {
    const resp = answers[q.id];
    if (q.type === 'likert') return resp >= 1 && resp <= 5;
    if (q.type === 'texto') return typeof resp === 'string' && resp.trim().length >= 10;
    return false;
  }).length;
  const progressPercent = Math.round((questionsAnsweredCount / QUESTIONS.length) * 100);

  const handleAnswerChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const isBlockValid = () => {
    return blockQuestions.every((q) => {
      const resp = answers[q.id];
      if (q.type === 'likert') return resp >= 1 && resp <= 5;
      if (q.type === 'texto') return typeof resp === 'string' && resp.trim().length >= 10;
      return false;
    });
  };

  const handleNext = () => {
    if (!isBlockValid()) {
      alert('Completa todas las preguntas antes de continuar.');
      return;
    }
    setShowCongrats(true);
    setTimeout(() => {
      setShowCongrats(false);
      setCurrentBlock((prev) => prev + 1);
    }, 1200);
  };

  const handlePrev = () => {
    if (currentBlock > 0) setCurrentBlock((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!isBlockValid()) {
      alert('Completa todas las preguntas antes de enviar.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://TU_API_GATEWAY_URL/api/cuestionarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuestas: answers }),
      });
      if (!response.ok) throw new Error('Error al procesar el test');
      const data = await response.json();
      setResultados(data);
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al procesar tus respuestas. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Cargando
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-formBtn border-t-primaryBtn rounded-full animate-spin"></div>
        <p className="mt-4 text-primaryText font-medium">Analizando tus respuestas…</p>
      </div>
    );
  }

  // Resultados finales
  if (resultados) {
    const { puntajeAnsiedad, puntajeEstres, comentariosExtra } = resultados;
    const categorize = (score) => {
      if (score <= 17) return 'Bajo';
      if (score <= 24) return 'Moderado';
      return 'Alto';
    };
    const categoriaAns = categorize(puntajeAnsiedad);
    const categoriaStr = categorize(puntajeEstres);

    return (
      <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-lg shadow border border-gray-200">

        {/* ---------- AQUÍ TAMBIÉN PUEDE IR LA X PARA VOLVER A HOME  */}
        <button
          onClick={() => navigate('/patient/home')}
          className="absolute top-4 right-4 focus:outline-none"
          aria-label="Cerrar Test"
        >
          <img
            src="/images/Equis_de_cuestionarios.png"
            alt="Cerrar"
            className="h-6 w-6"
          />
        </button>

        <h2 className="text-2xl font-semibold text-formTitle mb-6 text-center">
          Resultados de tu Evaluación
        </h2>

        <div className="bg-loginBg border border-primaryBtn p-4 rounded-lg mb-4">
          <p className="text-primaryText text-lg">
            <strong>Ansiedad:</strong> {puntajeAnsiedad} puntos ({categoriaAns})
          </p>
          <p className="text-primaryText text-lg">
            <strong>Estrés:</strong> {puntajeEstres} puntos ({categoriaStr})
          </p>
        </div>

        {comentariosExtra?.ansiedadKeywords && (
          <div className="bg-formBtn bg-opacity-20 border border-formBtn p-4 rounded-lg mb-4">
            <h3 className="text-formTitle font-medium mb-2">Palabras clave (Ansiedad):</h3>
            <p className="text-formTitle">{comentariosExtra.ansiedadKeywords.join(', ')}</p>
          </div>
        )}
        {comentariosExtra?.estresKeywords && (
          <div className="bg-formBtn bg-opacity-20 border border-formBtn p-4 rounded-lg mb-4">
            <h3 className="text-formTitle font-medium mb-2">Palabras clave (Estrés):</h3>
            <p className="text-formTitle">{comentariosExtra.estresKeywords.join(', ')}</p>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
          <h3 className="text-formTitle font-medium mb-2">Recomendaciones</h3>
          {puntajeAnsiedad > 24 && (
            <p className="text-gray-700 mb-2">
              😟 Tu nivel de ansiedad es alto. Practica respiración profunda y consulta a tu psicólogo.
            </p>
          )}
          {puntajeAnsiedad >= 18 && puntajeAnsiedad <= 24 && (
            <p className="text-gray-700 mb-2">
              🙂 Nivel de ansiedad moderado. Incorpora técnicas de relajación y mantente en contacto con tu terapeuta.
            </p>
          )}
          {puntajeAnsiedad <= 17 && (
            <p className="text-gray-700 mb-2">
              😌 Nivel de ansiedad bajo. ¡Excelente! Continúa con tus hábitos de autocuidado.
            </p>
          )}

          {puntajeEstres > 24 && (
            <p className="text-gray-700 mb-2">
              😟 Nivel de estrés alto. Tómate descansos activos y organiza tus tareas para reducir la carga.
            </p>
          )}
          {puntajeEstres >= 18 && puntajeEstres <= 24 && (
            <p className="text-gray-700 mb-2">
              🙂 Nivel de estrés moderado. Haz estiramientos y prioriza tus actividades.
            </p>
          )}
          {puntajeEstres <= 17 && (
            <p className="text-gray-700 mb-2">
              😌 Nivel de estrés bajo. ¡Bien hecho! Sigue con tus buenas prácticas de descanso.
            </p>
          )}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="block mx-auto px-6 py-2 bg-formBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
        >
          Volver a Empezar
        </button>
      </div>
    );
  }

  // Pantalla de bloques de preguntas
  return (
    <div className="relative max-w-3xl mx-auto mt-8 bg-white p-6 rounded-lg shadow border border-gray-200">
      {/** ------------------ INSERTAR AQUÍ LA “X” PARA SALIR DEL TEST ------------------ **/}
      <button
        onClick={() => navigate('/patient/home')}
        className="absolute top-4 right-4 focus:outline-none"
        aria-label="Cerrar Test"
      >
        <img
          src="/images/Equis_de_cuestionarios.png"
          alt="Cerrar"
          className="h-8 w-8"
        />
      </button>

      <h2 className="text-2xl font-semibold text-formTitle mb-6 text-center">
        Test Psicométrico de Ansiedad y Estrés
      </h2>

{/* Barra de progreso */}
<div className="flex items-center mb-4">
  <progress
    value={questionsAnsweredCount}
    max={QUESTIONS.length}
    className="w-full h-4 bg-gray-300 accent-formTitle"
  />
  <span className="w-16 text-right text-gray-600 font-medium">
    {progressPercent}%
  </span>
</div>


      {/* Mensaje de felicitación */}
      {showCongrats && (
        <div className="bg-loginBg border border-primaryBtn text-primaryText px-4 py-3 rounded-lg mb-4 text-center font-medium">
          🎉 ¡Muy bien! Completaste {(currentBlock + 1) * 25}% del test.
        </div>
      )}

      {/* Preguntas del bloque actual */}
      <div className="mb-6">
        <p className="text-primaryText mb-3 font-medium">
          Bloque {currentBlock + 1} de {totalBlocks}
        </p>
        {blockQuestions.map((q) => (
          <div key={q.id} className="mb-6">
            <label htmlFor={`q_${q.id}`} className="block text-primaryText font-medium mb-2">
              {q.text}
            </label>
            {q.type === 'likert' ? (
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {LIKERT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex flex-col items-center p-2 border rounded-lg cursor-pointer transition
                      hover:border-primaryText hover:bg-loginBg"
                  >
                    <input
                      id={`q_${q.id}_${opt.value}`}
                      type="radio"
                      name={`q_${q.id}`}
                      value={opt.value}
                      checked={answers[q.id] === opt.value}
                      onChange={() => handleAnswerChange(q.id, opt.value)}
                      className="hidden"
                    />
                    <span
                      className={`text-sm font-medium ${
                        answers[q.id] === opt.value
                          ? 'text-primaryText'
                          : 'text-gray-700'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <div
                      className={`mt-2 w-6 h-6 rounded-full border-2 ${
                        answers[q.id] === opt.value
                          ? 'border-primaryBtn bg-primaryBtn'
                          : 'border-gray-300'
                      } transition`}
                    />
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryText text-gray-700"
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
              : 'bg-formBtn text-white hover:bg-primaryTextActive'}
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
                : 'bg-formBtn text-white hover:bg-primaryTextActive'}
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
                : 'bg-primaryBtn text-white hover:bg-primaryTextActive'}
            `}
          >
            Enviar Resultados
          </button>
        )}
      </div>
    </div>
  );
}
