// src/pages/Patient/PatientAppointments.jsx
import React, { useState, useEffect } from 'react';

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Aquí simularíamos fetch('/api/patient/appointments')
    // Simulamos datos:
    const datosSimulados = [
      {
        id: 1,
        fecha: '2025-06-10',
        hora: '10:00',
        psicologa: 'Dra. María López',
        estado: 'Confirmada',
      },
      {
        id: 2,
        fecha: '2025-07-01',
        hora: '15:30',
        psicologa: 'Dra. Carmen Gutiérrez',
        estado: 'Pendiente pago',
      },
    ];
    setAppointments(datosSimulados);
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mis Citas Programadas</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-600">No tienes citas programadas.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left text-gray-700">Fecha</th>
              <th className="border px-4 py-2 text-left text-gray-700">Hora</th>
              <th className="border px-4 py-2 text-left text-gray-700">Psicóloga</th>
              <th className="border px-4 py-2 text-left text-gray-700">Estado</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{apt.fecha}</td>
                <td className="border px-4 py-2">{apt.hora}</td>
                <td className="border px-4 py-2">{apt.psicologa}</td>
                <td className={`border px-4 py-2 font-medium ${
                  apt.estado === 'Confirmada'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {apt.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
