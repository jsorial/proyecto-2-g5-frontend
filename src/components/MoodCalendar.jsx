// src/components/MoodCalendar.jsx
import React from 'react';

const moodMap = { happy:'😊', neutral:'😐', sad:'😟' };

export default function MoodCalendar({ logs }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h3 className="text-xl font-semibold text-formTitle mb-4">Registro de Ánimo</h3>
      <div className="grid grid-cols-7 gap-2">
        {logs.map(l => (
          <div key={l.date} className="flex flex-col items-center">
            <span className="text-sm text-gray-500">{l.date.slice(5)}</span>
            <span className="text-2xl">{moodMap[l.mood] || '❓'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
