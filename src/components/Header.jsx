import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow flex flex-col md:flex-row items-center justify-between p-4 space-y-4 md:space-y-0">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold text-red-600">Claro BI</h1>
        <NavLink to="/dashboard-claro" className={({isActive}) => isActive ? 'text-red-600 font-semibold' : 'text-gray-600 hover:text-red-600'}>
          Portabilidad
        </NavLink>
        <NavLink to="/dashboard-ventas" className={({isActive}) => isActive ? 'text-red-600 font-semibold' : 'text-gray-600 hover:text-red-600'}>
          Ventas Mensuales
        </NavLink>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">Usuario:</span>
        <span className="font-medium text-gray-800">Claro Perú</span>
      </div>
    </header>
  );
}
