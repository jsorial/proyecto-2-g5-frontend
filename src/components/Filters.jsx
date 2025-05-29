import React from 'react';
import Card from './Card';
export default function Filters({ filters, onChange, onApply }) {
  return (
    <Card>
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm text-gray-600">Desde</label>
          <input type="month" value={filters.from} onChange={e => onChange('from', e.target.value)} className="mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Hasta</label>
          <input type="month" value={filters.to} onChange={e => onChange('to', e.target.value)} className="mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Operador</label>
          <select value={filters.operator} onChange={e => onChange('operator', e.target.value)} className="mt-1 p-2 border rounded">
            <option value="">Todos</option>
            <option value="Claro">Claro</option>
            <option value="Movistar">Movistar</option>
            <option value="Entel">Entel</option>
          </select>
        </div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={filters.onlyClaro} onChange={e => onChange('onlyClaro', e.target.checked)} className="form-checkbox h-5 w-5 text-red-600" />
          <span className="text-sm text-gray-600">Solo CLARO</span>
        </label>
        <button onClick={onApply} className="ml-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Aplicar</button>
      </div>
    </Card>
  );
}
