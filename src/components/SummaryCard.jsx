// src/components/SummaryCard.jsx
import React from 'react';

export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 text-center">
      <p className="text-gray-500 mb-2">{title}</p>
      <p className="text-2xl font-bold text-primaryText">{value}</p>
    </div>
  );
}
