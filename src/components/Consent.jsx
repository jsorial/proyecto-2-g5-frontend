// src/components/Consent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Consent() {
  const [consentChecked, setConsentChecked] = useState(false);
  const navigate = useNavigate();

  const handleConsent = () => {
    if (!consentChecked) {
      alert('Debes aceptar el consentimiento para continuar.');
      return;
    }
    // Redirige al Test Psicométrico
    navigate('/patient/test');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Consentimiento Informado
      </h2>
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <p className="text-blue-700 mb-2">
          Antes de comenzar el Test Psicométrico de <strong>Ansiedad y Estrés</strong>, ten en cuenta:
        </p>
        <ul className="list-disc list-inside text-blue-700 mb-4">
          <li>Los datos que compartas serán confidenciales y usados solo con fines clínicos en el CEM.</li>
          <li>Podrás expresarte libremente en preguntas abiertas y recibir retroalimentación personalizada.</li>
          <li>Al aceptar, autorizas el uso de tus respuestas para análisis automáticos (Random Forest y SVM).</li>
        </ul>
        <label className="flex items-center gap-2 text-blue-800">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={() => setConsentChecked((prev) => !prev)}
            className="form-checkbox h-5 w-5 text-green-500"
          />
          Acepto compartir mis respuestas y entiendo cómo se usarán.
        </label>
      </div>
      <button
        onClick={handleConsent}
        className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        Continuar al Test 🚀
      </button>
    </div>
  );
}
