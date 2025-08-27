import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientPsychometricResults from './PatientPsychometricResults';
import { API_URL_TEST_ITEMS, API_URL_TEST_SUBMIT } from '../../config';
import { getAuthHeaders, getCurrentUser } from '../../utils/auth';

const BLOCK_SIZE = 10;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Fallback de opciones para C si la API aún no las manda
function getContextFallbackOptions(text) {
  const t = (text || '').toLowerCase();
  if (t.includes('duermes')) {
    return ['Menos de 4 horas', '4-5 horas', '6-7 horas', '8-9 horas', 'Más de 9 horas']
      .map((label, i) => ({ value: i + 1, label }));
  }
  if (t.includes('actividad física')) {
    return ['Nunca', '1-2 veces', '3-4 veces', '5-6 veces', 'Todos los días']
      .map((label, i) => ({ value: i + 1, label }));
  }
  if (t.includes('cafeína')) {
    const labels = ['Ninguna', '1-2', '3-4', '5-6', 'Más de 6'];
    return labels.map((label, i) => ({ value: i, label }));
  }
  if (t.includes('alcohol')) {
    return ['Nunca', 'Ocasionalmente', 'Moderadamente', 'Frecuentemente']
      .map((label, i) => ({ value: i + 1, label }));
  }
  if (t.includes('apoyo social')) {
    return ['Muy bajo', 'Bajo', 'Moderado', 'Alto', 'Muy alto']
      .map((label, i) => ({ value: i + 1, label }));
  }
  if (t.includes('trabajo/estudios') || t.includes('estrés en el trabajo') || t.includes('estrés en el estudio')) {
    return ['Muy bajo', 'Bajo', 'Moderado', 'Alto', 'Muy alto']
      .map((label, i) => ({ value: i + 1, label }));
  }
  if (t.includes('6 meses') || t.includes('eventos')) {
    return [
      'Pérdida de empleo',
      'Problemas financieros significativos',
      'Muerte de un ser querido',
      'Divorcio o separación',
      'Enfermedad grave (propia o familiar)',
      'Mudanza importante',
      'Conflictos familiares serios',
      'Problemas académicos importantes',
      'Ninguno de los anteriores',
    ].map((label, i) => ({ value: i + 1, label }));
  }
  if (t.includes('tratamiento psicológico')) {
    return ['Sí', 'No'].map((label, i) => ({ value: i + 1, label }));
  }
  if ((t.includes('medicamento') || t.includes('ansiedad')) && (t.includes('depresión') || t.includes('estrés'))) {
    return ['Sí', 'No', 'Prefiero no responder'].map((label, i) => ({ value: i + 1, label }));
  }
  return [];
}

export default function PatientMixedPsychometricTest() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [likertOptions, setLikertOptions] = useState([]);
  const [sections, setSections] = useState({ A: [], B: [], C: [] }); // cada pregunta: {id,seccion,codigo?,categoria,type,text,multi?}
  const [choiceOptionsMap, setChoiceOptionsMap] = useState({}); // { pregunta_id: [{value,label}] }

  // UI
  const [tab, setTab] = useState('A'); // 'A' | 'B' | 'C'
  const [pageIdx, setPageIdx] = useState({ A: 0, B: 0, C: 0 });
  const [answers, setAnswers] = useState({}); // { pregunta_id: number | number[] }
  const [modal, setModal] = useState({ open: false, message: '' });
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Carga desde API
  useEffect(() => {
    (async () => {
      try {
        setFetching(true);
        const r = await fetch(API_URL_TEST_ITEMS, { headers: { ...getAuthHeaders() } });
        if (!r.ok) throw new Error(`Error ${r.status}`);
        const data = await r.json();
        console.log('[Test] /items payload:', data);

        const all = Array.isArray(data?.preguntas) ? data.preguntas : [];

        const A = all.filter(p => String(p.seccion).toUpperCase() === 'A');
        const B = all.filter(p => String(p.seccion).toUpperCase() === 'B');
        const C = all.filter(p => String(p.seccion).toUpperCase() === 'C');

        const sectionsShuffled = { A: shuffle(A), B: shuffle(B), C: shuffle(C) };
        setSections(sectionsShuffled);

        setLikertOptions(data?.likert_options || [
          { value: 0, label: 'Nunca' },
          { value: 1, label: 'Varios días' },
          { value: 2, label: 'Más de la mitad de los días' },
          { value: 3, label: 'Casi todos los días' },
        ]);

        // Opciones por pregunta de C
        const ctxFromApi = data?.context_options || {};
        const ctxWithFallback = { ...ctxFromApi };
        for (const q of sectionsShuffled.C) {
          if (!ctxWithFallback[q.id] || ctxWithFallback[q.id]?.length === 0) {
            ctxWithFallback[q.id] = getContextFallbackOptions(q.text);
          }
        }
        setChoiceOptionsMap(ctxWithFallback);
      } catch (e) {
        console.error('[Test] load error:', e);
      } finally {
        setFetching(false);
      }
    })();
  }, []);

  // ======= Utilidades de validación/estado =======

  const allQuestions = useMemo(
    () => [...sections.A, ...sections.B, ...sections.C],
    [sections]
  );

  const isLikert = (q) => String(q.type).toLowerCase() === 'likert';
  const isChoice = (q) => String(q.type).toLowerCase() === 'choice';
  const isMulti = (q) => q?.multi === true || String(q?.codigo || '').toUpperCase() === 'C7';

  const getOptionsFor = (q) => (isLikert(q) ? likertOptions : (choiceOptionsMap[q.id] || []));

  const hasAnswer = (q) => {
    const a = answers[q.id];
    if (isLikert(q)) return Number.isInteger(a) && a >= 0 && a <= 3;
    if (isChoice(q)) {
      return isMulti(q) ? Array.isArray(a) && a.length > 0 : a !== undefined && a !== null && String(a).length > 0;
    }
    return !!a;
  };

  const sectionComplete = (sec) => sections[sec].every(hasAnswer);

  // No permitir saltar a B/C si A (o A+B) no están completas
  const sectionUnlocked = (sec) => {
    if (sec === 'A') return true;
    if (sec === 'B') return sectionComplete('A');
    if (sec === 'C') return sectionComplete('A') && sectionComplete('B');
    return true;
  };

  const answeredCount = allQuestions.filter(hasAnswer).length;
  const progressPercent = allQuestions.length
    ? Math.round((answeredCount / allQuestions.length) * 100)
    : 0;

  const totalPages = useMemo(() => {
    const by = {};
    for (const s of ['A', 'B', 'C']) {
      by[s] = Math.max(1, Math.ceil(sections[s].length / BLOCK_SIZE));
    }
    return by;
  }, [sections]);

  const currentBlock = useMemo(() => {
    const start = pageIdx[tab] * BLOCK_SIZE;
    return sections[tab].slice(start, start + BLOCK_SIZE);
  }, [sections, tab, pageIdx]);

  // ======= Manejo de respuestas (toggle incluida) =======

  const toggleSingle = (q, val) => {
    setAnswers(prev => {
      const current = prev[q.id];
      // si vuelves a hacer click en el mismo valor => limpiar selección
      if (current === val) {
        const { [q.id]: _omit, ...rest } = prev;
        return rest;
      }
      return { ...prev, [q.id]: val };
    });
  };

  const toggleMulti = (q, val) => {
    setAnswers(prev => {
      const arr = Array.isArray(prev[q.id]) ? prev[q.id] : [];
      const exists = arr.includes(val);
      const next = exists ? arr.filter(v => v !== val) : [...arr, val];
      return { ...prev, [q.id]: next };
    });
  };

  const clearAnswer = (q) => {
    setAnswers(prev => {
      const { [q.id]: _omit, ...rest } = prev;
      return rest;
    });
  };

  const handleClickOption = (q, val) => {
    if (isChoice(q) && isMulti(q)) return toggleMulti(q, val);
    return toggleSingle(q, val);
  };

  // ======= Validación por bloque/total =======

  const validateBlock = () => currentBlock.every(hasAnswer);
  const validateAll = () => ['A', 'B', 'C'].every(sectionComplete); // exige también C
  // Si no quieres exigir C, usa: () => sectionComplete('A') && sectionComplete('B')

  // ======= Navegación =======

  const openModal = (msg) => setModal({ open: true, message: msg });
  const closeModal = () => setModal({ open: false, message: '' });

  const nextBlock = () => {
    if (!validateBlock()) return openModal('Por favor completa todas las preguntas del bloque antes de continuar.');
    const tpl = [
      '¡Genial! Ya has completado %{p}% del test. 💪',
      '¡Sigue así! Llevas %{p}% recorrido. 🚀',
      '¡Bravo! %{p}% hecho, ¡no te detengas! 🎉',
    ][Math.floor(Math.random() * 3)];
    openModal(tpl.replace('%{p}%', String(progressPercent)));
    setTimeout(() => {
      closeModal();
      setPageIdx(prev => {
        const last = totalPages[tab] - 1;
        if (prev[tab] < last) return { ...prev, [tab]: prev[tab] + 1 };
        // pasa a la siguiente sección disponible
        const order = ['A', 'B', 'C'];
        const i = order.indexOf(tab);
        for (let k = i + 1; k < order.length; k++) {
          const s = order[k];
          if (sections[s].length > 0 && sectionUnlocked(s)) {
            setTab(s);
            return prev;
          }
        }
        return prev;
      });
    }, 900);
  };

  const prevBlock = () => {
    setPageIdx(prev => {
      if (prev[tab] > 0) return { ...prev, [tab]: prev[tab] - 1 };
      // retroceder de sección
      const order = ['A', 'B', 'C'];
      const i = order.indexOf(tab);
      for (let k = i - 1; k >= 0; k--) {
        const s = order[k];
        if (sections[s].length > 0) {
          setTab(s);
          const last = Math.max(0, totalPages[s] - 1);
          return { ...prev, [s]: last };
        }
      }
      return prev;
    });
  };

  const isLastPageOfTab = pageIdx[tab] >= totalPages[tab] - 1;
  const isLastTab = (() => {
    const order = ['A', 'B', 'C'];
    const idx = order.indexOf(tab);
    for (let k = idx + 1; k < order.length; k++) {
      if (sections[order[k]].length > 0) return false;
    }
    return true;
  })();

  const trySwitchTab = (s) => {
    if (!sectionUnlocked(s)) {
      openModal(s === 'B'
        ? 'Primero completa la Sección A (Ansiedad).'
        : 'Primero completa A y B para pasar a la Sección C (Contexto).'
      );
      return;
    }
    setTab(s);
  };

  // ======= Envío =======

  async function submitTest() {
    if (!validateBlock()) return openModal('Termina el bloque actual antes de enviar.');
    if (!validateAll()) return openModal('Aún hay preguntas sin responder. Revisa todas las secciones.');

    setLoading(true);
    try {
      const now = new Date().toISOString();
      const payload = {
        test_id: 'tst_cem_ab_v1',
        user_id: user?.id, // en prod, que el backend lo tome del JWT
        started_at: now,
        finished_at: now,
        answers: Object.entries(answers).map(([pregunta_id, value]) => ({ pregunta_id, value })),
      };
      console.log('[Test] submit payload:', payload);

      const r = await fetch(API_URL_TEST_SUBMIT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(`Error ${r.status}`);
      const res = await r.json();
      console.log('[Test] submit result:', res);

      setResults({
        ansiedad: res.puntaje_ansiedad ?? 0,
        estres: res.puntaje_estres ?? 0,
      });
    } catch (e) {
      console.error('[Test] submit error:', e);
      openModal('No pudimos guardar tu test. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  // ======= UI =======

  // ...
  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-fondo_fuera_formularios_dentro_del_body px-4">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Blue animado */}
          <img
            src="/images/Blue.png"
            alt="Blue"
            className="w-28 md:w-36 animate-bounce-slow"
          />

          {/* Mensaje bonito */}
          <h2 className="text-2xl md:text-3xl font-bold text-primaryText">
            Preparando tu test…
          </h2>
          <p className="text-gray-600 max-w-md">
            Estoy ordenando las preguntas y calibrando las opciones.
            ¡Ya casi empezamos! 💙
          </p>

          {/* Spinner */}
          <div className="w-14 h-14 border-4 border-formBtn border-t-primaryBtn rounded-full animate-spin" />
        </div>
      </div>
    );
  }
  // ...


  if (results) {
    return (
      <PatientPsychometricResults
        puntajeAnsiedad={results.ansiedad}
        puntajeEstres={results.estres}
      />
    );
  }

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-12">
      {/* Hero */}
      <div className="relative max-w-5xl mx-auto mb-8 flex items-center bg-white border border-primaryBtn p-6 rounded-lg">
        <img src="/images/Blue.png" alt="Blue" className="w-24 mr-6 animate-bounce-slow" />
        <div>
          <h1 className="text-3xl font-bold text-primaryText">Test Psicométrico CEM</h1>
          <p className="text-gray-700">
            Total preguntas: <strong>{allQuestions.length}</strong> ·
            A: {sections.A.length} · B: {sections.B.length} · C: {sections.C.length}
          </p>
        </div>
        <button
          onClick={() => navigate('/patient/home')}
          aria-label="Cerrar Test"
          className="absolute top-4 right-2 bg-white rounded-full p-1 hover:bg-gray-100 transition"
        >
          <img src="/images/Equis_de_cuestionarios.png" alt="Cerrar" className="h-14 w-14" />
        </button>
      </div>

      {/* Card */}
      <div className="relative max-w-5xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-200">
        {/* Tabs por sección (con bloqueo) */}
        <div className="flex gap-2 mb-6">
          {['A', 'B', 'C'].map(s => (
            <button
              key={s}
              onClick={() => trySwitchTab(s)}
              className={`px-4 py-2 rounded-full border ${tab === s
                ? 'bg-primaryBtn text-white border-primaryBtn'
                : sectionUnlocked(s)
                  ? 'bg-white text-gray-700 border-gray-300'
                  : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                }`}
              disabled={!sectionUnlocked(s) || sections[s].length === 0}
              title={sections[s].length === 0 ? 'Sin preguntas' : ''}
            >
              {s === 'A' ? 'Sección A · Ansiedad' : s === 'B' ? 'Sección B · Estrés' : 'Sección C · Contexto'}
              {sections[s].length > 0 ? ` (${sections[s].length})` : ''}
              {sectionComplete(s) && ' ✓'}
            </button>
          ))}
        </div>

        {/* Progreso global */}
        <div className="flex items-center mb-4">
          <progress
            value={answeredCount}
            max={allQuestions.length || 1}
            className="
              w-full h-4 rounded-full appearance-none
              bg-gray-300 accent-blue-600
              [&::-webkit-progress-bar]:bg-gray-300
              [&::-webkit-progress-bar]:rounded-full
              [&::-webkit-progress-value]:bg-blue-600
              [&::-webkit-progress-value]:rounded-full
              [&::-moz-progress-bar]:bg-blue-600
            "
          />
          <span className="w-16 text-right text-gray-600 font-medium">{progressPercent}%</span>
        </div>

        {/* Bloque actual */}
        <p className="text-primaryText mb-3 font-medium">
          {tab === 'A' ? 'Sección A · Ansiedad' : tab === 'B' ? 'Sección B · Estrés' : 'Sección C · Contexto'}
          {' · '}Bloque {pageIdx[tab] + 1} de {totalPages[tab]}
        </p>

        {currentBlock.map(q => {
          const opts = getOptionsFor(q);
          const value = answers[q.id];
          const multi = isMulti(q);

          return (
            <div key={q.id} className="mb-6">
              <label className="block text-formTitle mb-2">
                {q.text}
                {!hasAnswer(q) && <span className="ml-2 text-sm text-red-600">(requerida)</span>}
              </label>

              <div className={`flex flex-wrap gap-3`}>
                {opts.map(opt => {
                  const selected = multi
                    ? Array.isArray(value) && value.includes(opt.value)
                    : value === opt.value;

                  return (
                    <button
                      key={String(opt.value)}
                      onClick={() => handleClickOption(q, opt.value)}
                      className={`px-3 py-2 rounded-full border transition ${selected
                        ? 'bg-primaryBtn text-white border-primaryBtn'
                        : 'bg-white text-gray-700 border-gray-300'
                        }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
                {/* Botón para limpiar respuesta explícitamente */}
                {hasAnswer(q) && (
                  <button
                    onClick={() => clearAnswer(q)}
                    className="px-3 py-2 rounded-full border bg-gray-100 text-gray-600 hover:bg-gray-200"
                    title="Quitar selección"
                  >
                    Quitar
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Navegación */}
        <div className="flex justify-between">
          <button
            onClick={prevBlock}
            disabled={pageIdx[tab] === 0 && tab === 'A'}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded disabled:opacity-50"
          >
            Anterior
          </button>

          {!(isLastPageOfTab && isLastTab) ? (
            <button
              onClick={nextBlock}
              className="px-4 py-2 bg-primaryBtn text-white rounded hover:bg-primaryTextActive"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={submitTest}
              disabled={loading}
              className="px-4 py-2 bg-primaryBtn text-white rounded hover:bg-primaryTextActive disabled:opacity-60"
            >
              {loading ? 'Enviando…' : 'Enviar'}
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
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
