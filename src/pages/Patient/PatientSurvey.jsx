// src/pages/Survey.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export default function Survey() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    claridad: '',
    utilidad: '',
    recomendacion: '',
    comentarios: ''
  });

  const options = {
    claridad: ['Muy clara', 'Clara', 'Neutral', 'Confusa'],
    utilidad: ['Sí', 'Algo útil', 'No me ayudó'],
    recomendacion: ['Definitivamente sí', 'Tal vez', 'No lo recomendaría']
  };

  const handleSelect = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleChange = e => {
    setAnswers(prev => ({ ...prev, comentarios: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // enviar `answers` a la API…
    alert('¡Gracias por tu feedback!');
    navigate('/patient/home');
  };

  return (
    <div className="min-h-screen bg-fondo_fuera_formularios_dentro_del_body py-12">
      <div className="relative max-w-2xl mx-auto bg-white p-8 rounded-xl shadow border border-gray-200">
        {/* Cabecera */}
        <div className="flex items-center mb-6">
          <img src="/images/Blue.png" alt="Blue" className="w-16 h-auto animate-bounce-slow mr-4" />
          <h1 className="text-2xl font-semibold text-formTitle flex-1">
            Encuesta de Satisfacción
          </h1>
          <button
            onClick={() => navigate('/patient/home')}
            aria-label="Cerrar encuesta"
            className="bg-white rounded-full p-1 hover:bg-gray-100 transition"
          >
            <img
              src="/images/Equis_de_cuestionarios.png"
              alt="Cerrar"
              className="w-14 h-14"
            />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {Object.entries(options).map(([field, opts], idx) => (
            <div key={field}>
              <p className="mb-4 text-gray-800 font-medium">
                {`${idx + 1}. ${field === 'claridad'
                  ? '¿Cómo calificarías la claridad del test?'
                  : field === 'utilidad'
                  ? '¿Te resultó útil la visualización de resultados?'
                  : '¿Recomendarías este sistema a un amigo?'}`}
              </p>
              <div className="flex flex-wrap gap-3">
                {opts.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(field, opt)}
                    className={clsx(
                      'px-4 py-2 rounded-lg border transition',
                      answers[field] === opt
                        ? 'bg-primaryBtn text-white border-primaryBtn'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="mb-4 text-gray-800 font-medium">4. Comentarios adicionales</p>
            <textarea
              name="comentarios"
              value={answers.comentarios}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryBtn"
              placeholder="Escribe aquí..."
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-3 bg-formBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
            >
              Enviar encuesta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
