import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const linkClasses = isActive =>
    isActive
      ? 'block px-4 py-2 rounded-lg text-white bg-red-600'
      : 'block px-4 py-2 rounded-lg text-gray-700 hover:bg-red-100';

  return (
    <nav className="w-64 bg-white shadow-md p-6 flex flex-col space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Menú</h2>
      <NavLink to="/dashboard-claro" className={({ isActive }) => linkClasses(isActive)}>
        Portabilidad
      </NavLink>
      <NavLink to="/dashboard-ventas" className={({ isActive }) => linkClasses(isActive)}>
        Ventas Mensuales
      </NavLink>
    </nav>
  );
}
