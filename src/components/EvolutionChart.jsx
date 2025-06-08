// src/components/EvolutionChart.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function EvolutionChart({ data }) {
  // transformamos data a { date, ansiedad, estres }
  const chartData = data.map(d => ({
    date: d.date || d.fecha,
    ansiedad: d.ansiedad,
    estres: d.estres
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="ansiedad" stroke="#6b85bb" />
        <Line type="monotone" dataKey="estres" stroke="#58c9ec" />
      </LineChart>
    </ResponsiveContainer>
  );
}
