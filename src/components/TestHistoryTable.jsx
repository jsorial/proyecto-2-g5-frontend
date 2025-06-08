// src/components/TestHistoryTable.jsx
import React from 'react';

export default function TestHistoryTable({ tests }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-tableHeaderBg">
            {['Fecha','Ansiedad','Estrés','Ver'].map(h=>(
              <th key={h} className="border px-4 py-2 text-white">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tests.map(t => (
            <tr key={t.id} className="hover:bg-loginBg">
              <td className="border px-4 py-2">{t.date || t.fecha}</td>
              <td className="border px-4 py-2">{t.ansiedad}</td>
              <td className="border px-4 py-2">{t.estres}</td>
              <td className="border px-4 py-2 text-center">
                <button className="px-2 py-1 bg-formBtn text-white rounded">
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
