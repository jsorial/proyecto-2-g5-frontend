// src/pages/Patient/PatientAppointments.jsx
import React, { useState, useEffect } from 'react';

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Aquí simularíamos fetch('/api/patient/appointments')
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
    // Se ha agregado `mt-8` para separar este bloque del Navbar
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-semibold text-formTitle mb-4">
        Mis Citas Programadas
      </h2>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No tienes citas programadas.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-tableHeaderBg">
              <th className="border px-4 py-2 text-left text-white">Fecha</th>
              <th className="border px-4 py-2 text-left text-white">Hora</th>
              <th className="border px-4 py-2 text-left text-white">Psicóloga</th>
              <th className="border px-4 py-2 text-left text-white">Estado</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-loginBg">
                <td className="border px-4 py-2 text-gray-700">{apt.fecha}</td>
                <td className="border px-4 py-2 text-gray-700">{apt.hora}</td>
                <td className="border px-4 py-2 text-gray-700">{apt.psicologa}</td>
                <td
                  className={`border px-4 py-2 font-medium ${
                    apt.estado === 'Confirmada'
                      ? 'text-stateActive'
                      : 'text-stateInactive'
                  }`}
                >
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
