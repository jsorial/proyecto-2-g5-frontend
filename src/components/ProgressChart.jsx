// src/components/ProgressChart.jsx
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function ProgressChart({ data }) {
  return (
    <div className="w-full h-64 bg-white p-4 rounded-lg shadow border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
        Evolución de Puntajes: Ansiedad vs. Estrés
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="fecha"
            tick={{ fill: '#4B5563', fontSize: 12 }}
            tickFormatter={(str) => {
              // mostrar solo día-mes
              const parts = str.split('-');
              return `${parts[2]}/${parts[1]}`;
            }}
          />
          <YAxis
            domain={[0, 'auto']}
            tick={{ fill: '#4B5563', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#F3F4F6', borderRadius: '4px' }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="ansiedad"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="Ansiedad"
          />
          <Line
            type="monotone"
            dataKey="estres"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="Estrés"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
