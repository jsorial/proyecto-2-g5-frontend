// src/components/MixedPsychometricTest.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PsychometricResults from './PsychometricResults';
import { API_URL_CUESTIONARIO, API_URL_CUESTIONARIO_OPCIONES } from '../../config';
const BLOCK_SIZE = 5;

// Carga dinámica de preguntas y opciones
// Suponiendo que tienes en public/api:
//  - questions.json   (array de { id, categoria, type, text })
//  - likertOptions.json (array de { value, label })


export default function PatientMixedPsychometricTest() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [blockIndex, setBlockIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, message: '' });



  // Carga y selecciona 10 de ansiedad + 10 de estrés, luego mezcla
  useEffect(() => {

    const minPreguntas = 2;
    //const maxPreguntas = 20;

    // Genera número aleatorio entre 15 y 20 (inclusive)
    //const cantpreguntas =  Math.floor(Math.random() * (maxPreguntas - minPreguntas + 1)) + minPreguntas;
    const cantAnsiedad = minPreguntas
    const cantEstres = minPreguntas

    Promise.all([
      fetch(`${API_URL_CUESTIONARIO}`).then(r => r.json()),
      fetch(`${API_URL_CUESTIONARIO_OPCIONES}`).then(r => r.json())
    ]).then(([qs, opts]) => {
      const ansiedad = qs.filter(q => q.categoria === 'ansiedad');
      const estres = qs.filter(q => q.categoria === 'estrés');
      const pick = [...shuffle(ansiedad).slice(0, cantAnsiedad), ...shuffle(estres).slice(0, cantEstres)]; // improtante si pones 20 / 20 se selecionan 10 de ansiedad y 10 de estres y se ponen en 20, si pones 10 de 10 solo tendras 10 en tu test y solo 2 bloques, con el otro tienes 4 bloques
      setOptions(opts);
      setQuestions(pick);
      setShuffled(shuffle(pick));
    });
  }, []);

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  if (shuffled.length === 0) return <p className="text-center mt-12">Cargando test…</p>;

  const totalBlocks = Math.ceil(shuffled.length / BLOCK_SIZE);
  const block = shuffled.slice(blockIndex * BLOCK_SIZE, (blockIndex + 1) * BLOCK_SIZE);

  // Contador global de completadas:
  const answeredCount = Object.keys(answers).length;

  // Progreso: total respondidas dividido entre el total de preguntas
  const progressPercent = Math.round((answeredCount / shuffled.length) * 100);


  function openModal(msg) {
    setModal({ open: true, message: msg });
  }
  function closeModal() {
    setModal({ open: false, message: '' });
  }

  function handleAnswer(id, val) {
    setAnswers(a => ({ ...a, [id]: val }));
  }

  function validateBlock() {
    return block.every(q => {
      const a = answers[q.id];
      if (q.type === 'likert') return a >= 1 && a <= 5;
      return typeof a === 'string' && a.trim().length >= 10;
    });
  }

  // 1) Define tu lista de mensajes motivadores:
  const MOTIVATIONAL_TEMPLATES = [
    "¡Genial! Ya has completado %{p}% % del test. 💪",
    "¡Sigue así! Lleva un %{p}% % recorrido. 🚀",
    "¡Bravo! %{p}% % hecho, ¡no te detengas! 🎉",
    "¡Buen trabajo! Has alcanzado el %{p}% % del test. 👍",
    "¡Vas de maravilla! %{p}% % completado. 🌟",
    "¡Excelente! Ya vas %{p}% % adelante. 🏅",
    "¡Lo estás logrando! %{p}% % superado. 🎯",
    "¡Muy bien! %{p}% % completado con éxito. 🥳",
    "¡Ánimo! %{p}% % del camino recorrido. 🌈",
    "¡Estás imparable! %{p}% % completado. 🔥",
    "¡Fantástico! Alcanzaste el %{p}% % del test. 🎈",
    "¡Sigue así! Ya casi estás: %{p}% % done. ✨",
    "¡Buen ritmo! %{p}% % completado. 🏃‍♂️",
    "¡Impresionante! %{p}% % superado. 🚩",
    "¡Adelante! %{p}% % completado. 🌟"
  ];

  // 2) Función para formatear un template con el porcentaje:
  function formatMessage(template, p) {
    return template.replace("%{p}%", p);
  }

  // 3) nextBlock con mensaje aleatorio:
  function nextBlock() {
    if (!validateBlock()) {
      return openModal("Por favor completa todas las preguntas antes de continuar.");
    }

    // Calcula porcentaje real
    const total = shuffled.length;
    const contestadas = Object.keys(answers).length;
    const percent = Math.round((contestadas / total) * 100);

    // Elige un template aleatorio
    const tpl = MOTIVATIONAL_TEMPLATES[
      Math.floor(Math.random() * MOTIVATIONAL_TEMPLATES.length)
    ];
    const msg = formatMessage(tpl, percent);

    // Muestra modal
    openModal(msg);

    // Tras 1.2s cierra y avanza
    setTimeout(() => {
      closeModal();
      setBlockIndex(i => i + 1);
    }, 1200);
  }

  function prevBlock() {
    setBlockIndex(i => Math.max(0, i - 1));
  }

  async function submitTest() {
    if (!validateBlock()) return openModal('Por favor completa todas las preguntas antes de enviar.');
    setLoading(true);
    try {
      // Simula POST y respuesta
      await new Promise(r => setTimeout(r, 4000));
      // Ejemplo de resultados calculados al vuelo:
      const ans = Object.values(answers).filter(v => typeof v === 'number').reduce((s, n) => s + n, 0);
      const est = ans;
      setResults({ ansiedad: ans, estres: est });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-fondo_fuera_formularios_dentro_del_body px-4">
        {/* Imagen de Blue a la izquierda */}
        <img
          src="/images/Blue.png"
          alt="Blue"
          className="w-60 h-60 mr-12 animate-pulse"
        />

        {/* Spinner + mensaje a la derecha */}
        <div className="flex flex-col items-center space-y-6">
          {/* Spinner más grande */}
          <div className="w-16 h-16 border-4 border-formBtn border-t-primaryBtn rounded-full animate-spin" />

          {/* Mensaje con texto más grande */}
          <p className="text-2xl text-primaryText text-center">
            Espérate un ratito más.<br />
            ¡Ya conoceremos tus resultados!
          </p>
        </div>
      </div>
    );
  }



  if (results) {
    return (
      <PsychometricResults
        puntajeAnsiedad={results.ansiedad}
        puntajeEstres={results.estres}
      />
    );
  }



  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-12">
      {/* Hero de Blue */}
      <div className="relative max-w-5xl mx-auto mb-8 flex items-center bg-white border border-primaryBtn  p-6 rounded-lg">
        <img src="/images/Blue.png" alt="Blue" className="w-24 mr-6 animate-bounce-slow" />

        <div>
          <h1 className="text-3xl font-bold text-primaryText">
            Test Psicométrico de Ansiedad y Estrés
          </h1>
          <p className="text-gray-700">
            {shuffled.length > 0
              ? `Responde ${shuffled.length} preguntas para medir tu bienestar.`
              : 'Cargando preguntas...'}
            <br />
            ({questions.filter(q => q.categoria === 'ansiedad').length} de ansiedad, {questions.filter(q => q.categoria === 'estrés').length} de estrés)
          </p>
        </div>

        <button
          onClick={() => navigate('/patient/home')}
          aria-label="Cerrar Test"
          className="absolute top-4 right-2 bg-white rounded-full p-1 hover:bg-gray-100 transition"
        >
          <img
            src="/images/Equis_de_cuestionarios.png"
            alt="Cerrar"
            className="h-14 w-14"
          />
        </button>
      </div>


      {/* Card */}
      <div className="relative max-w-5xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-200">
        {/* Cerrar */}


        {/* Barra de progreso */}


        {/* Barra de progreso */}
        <div className="flex items-center mb-4">
          <progress
            value={answeredCount}
            max={shuffled.length}
            className="w-full h-4 bg-gray-300 accent-formTitle"
          />

          <span className="w-16 text-right text-gray-600 font-medium">
            {progressPercent}%
          </span>
        </div>


        {/* Preguntas */}
        <p className="text-primaryText mb-3 font-medium">
          Bloque {blockIndex + 1} de {totalBlocks}
        </p>
        {block.map(q => (
          <div key={q.id} className="mb-6">
            <label className="block text-formTitle mb-2">{q.text}</label>
            {q.type === 'likert' ? (
              <div className="grid grid-cols-5 gap-4">
                {options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(q.id, opt.value)}
                    className={`
                      p-2 rounded-full border transition
                      ${answers[q.id] === opt.value
                        ? 'bg-primaryBtn text-white border-primaryBtn'
                        : 'bg-white text-gray-700 border-gray-300'
                      }
                    `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : (
              <textarea
                rows={4}
                value={answers[q.id] || ''}
                onChange={e => handleAnswer(q.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            )}
          </div>
        ))}

        {/* Navegación */}
        <div className="flex justify-between">
          <button
            onClick={prevBlock}
            disabled={blockIndex === 0}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          {blockIndex < totalBlocks - 1 ? (
            <button
              onClick={nextBlock}
              className="px-4 py-2 bg-primaryBtn text-white rounded hover:bg-primaryTextActive"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={submitTest}
              className="px-4 py-2 bg-primaryBtn text-white rounded hover:bg-primaryTextActive"
            >
              Enviar
            </button>
          )}
        </div>
      </div>

      {/* Modal genérico */}
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow max-w-sm text-center">
            <img src="/images/Blue.png" alt="Blue" className="w-16 mx-auto mb-4" />
            <p className="text-gray-800 mb-4">{modal.message}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-primaryBtn text-white rounded hover:bg-primaryTextActive"
            >
              ¡Entendido!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}