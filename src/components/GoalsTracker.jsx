// src/components/GoalsTracker.jsx
import React from 'react';

export default function GoalsTracker({ goals }) {
  const total = goals.length;
  const done  = goals.filter(g=>g.completed).length;
  const pct   = total ? Math.round((done/total)*100) : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h3 className="text-xl font-semibold text-formTitle mb-4">Metas Semanales</h3>
      <div className="space-y-2">
        {goals.map(g => (
          <div key={g.id} className="flex justify-between">
            <span>{g.title}</span>
            <span>{g.completed ? '✔️' : '⏳'}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
          <div
            className="h-2 rounded-full bg-primaryBtn"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-sm text-gray-600">{pct}% completado</p>
      </div>
    </div>
  );
}
