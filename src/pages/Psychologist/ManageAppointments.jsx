// src/pages/Psychologist/ManageAppointments.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageAppointments() {
  const navigate = useNavigate();

  // Estado de citas
  const [appointments, setAppointments] = useState([]);
  // Filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos'); // 'Todos' | 'Confirmada' | 'Pendiente' | 'Cancelada'
  // Modal de cancelación
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  // Modal de exportación
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportCSV, setExportCSV] = useState(false);
  const [exportExcel, setExportExcel] = useState(false);
  const [exportPDF, setExportPDF] = useState(false);

  useEffect(() => {
    // Simular fetch('/api/psych/appointments')
    const datosSimulados = [
      {
        id: 201,
        paciente: 'Juan Carlos Pérez',
        pacienteId: '12345678',
        psicologa: 'Dra. López',
        fecha: '2025-06-10',
        hora: '10:00',
        estado: 'Confirmada',
        pagado: true,
        createdAt: '2025-05-01',
      },
      {
        id: 202,
        paciente: 'María Fernanda López',
        pacienteId: '87654321',
        psicologa: 'Dra. Gutiérrez',
        fecha: '2025-06-11',
        hora: '14:00',
        estado: 'Pendiente',
        pagado: false,
        createdAt: '2025-05-05',
      },
      {
        id: 203,
        paciente: 'Carlos Ruiz',
        pacienteId: '23456789',
        psicologa: 'Dra. López',
        fecha: '2025-06-12',
        hora: '09:00',
        estado: 'Cancelada',
        pagado: false,
        createdAt: '2025-05-07',
      },
    ];
    setAppointments(datosSimulados);
  }, []);

  // Filtrar por búsqueda y estado
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.id.toString().includes(searchTerm.trim()) ||
      apt.paciente.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      apt.pacienteId.includes(searchTerm.trim());
    const matchesStatus =
      statusFilter === 'Todos' || apt.estado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Abrir modal de cancelación
  const confirmCancel = (id) => {
    setAppointmentToCancel(id);
    setShowCancelModal(true);
  };

  // Ejecutar cancelación
  const handleCancel = () => {
    setAppointments((prev) =>
      prev.map((c) =>
        c.id === appointmentToCancel ? { ...c, estado: 'Cancelada' } : c
      )
    );
    setShowCancelModal(false);
    setAppointmentToCancel(null);
  };

  // Funciones de exportación
  const performExport = () => {
    if (!exportCSV && !exportExcel && !exportPDF) {
      alert('Selecciona al menos un formato para exportar.');
      return;
    }
    if (exportCSV) exportToCSV();
    if (exportExcel) exportToExcel();
    if (exportPDF) exportToPDF();
    setShowExportModal(false);
    setExportCSV(false);
    setExportExcel(false);
    setExportPDF(false);
  };

  const exportToCSV = () => {
    if (appointments.length === 0) {
      alert('No hay datos para exportar a CSV.');
      return;
    }
    const header = [
      'ID',
      'Paciente',
      'ID Paciente',
      'Psicóloga',
      'Fecha',
      'Hora',
      'Estado',
      'Pagado',
      'Creado En',
    ];
    const rows = appointments.map((c) => [
      c.id,
      c.paciente,
      c.pacienteId,
      c.psicologa,
      c.fecha,
      c.hora,
      c.estado,
      c.pagado ? 'Sí' : 'No',
      c.createdAt,
    ]);

    const csvContent =
      [header, ...rows]
        .map((e) => e.join(','))
        .join('\n') + '\n';

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `citas_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    // Simulación de exportación a Excel; usar librería SheetJS en producción
    alert('Exportando a Excel... (simulación)');
  };

  const exportToPDF = () => {
    // Simulación de exportación a PDF; usar jsPDF en producción
    alert('Exportando a PDF... (simulación)');
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Gestión de Citas
      </h2>

      {/* Controles superiores */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Crear nueva cita */}
        <button
          onClick={() => navigate('/psych/create-appointment')}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
        >
          + Crear Nueva Cita
        </button>

        {/* Abrir modal de exportación */}
        <button
          onClick={() => setShowExportModal(true)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Exportar
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Buscar por ID, paciente o ID Paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-1/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <option value="Todos">Todos</option>
          <option value="Confirmada">Confirmadas</option>
          <option value="Pendiente">Pendientes</option>
          <option value="Cancelada">Canceladas</option>
        </select>
      </div>

      {/* Tabla de citas */}
      {filteredAppointments.length === 0 ? (
        <p className="text-gray-600 text-center">No se encontraron citas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left text-gray-700">ID</th>
                <th className="border px-4 py-2 text-left text-gray-700">Paciente</th>
                <th className="border px-4 py-2 text-left text-gray-700">ID Paciente</th>
                <th className="border px-4 py-2 text-left text-gray-700">Psicóloga</th>
                <th className="border px-4 py-2 text-left text-gray-700">Fecha</th>
                <th className="border px-4 py-2 text-left text-gray-700">Hora</th>
                <th className="border px-4 py-2 text-left text-gray-700">Estado</th>
                <th className="border px-4 py-2 text-left text-gray-700">Pagado</th>
                <th className="border px-4 py-2 text-left text-gray-700">Creado En</th>
                <th className="border px-4 py-2 text-center text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{c.id}</td>
                  <td className="border px-4 py-2">{c.paciente}</td>
                  <td className="border px-4 py-2">{c.pacienteId}</td>
                  <td className="border px-4 py-2">{c.psicologa}</td>
                  <td className="border px-4 py-2">{c.fecha}</td>
                  <td className="border px-4 py-2">{c.hora}</td>
                  <td
                    className={`border px-4 py-2 font-medium ${
                      c.estado === 'Confirmada'
                        ? 'text-green-600'
                        : c.estado === 'Pendiente'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {c.estado}
                  </td>
                  <td
                    className={`border px-4 py-2 font-medium ${
                      c.pagado ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {c.pagado ? 'Sí' : 'No'}
                  </td>
                  <td className="border px-4 py-2">{c.createdAt}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    {/* Botón para editar */}
                    <button
                      onClick={() => navigate(`/psych/edit-appointment/${c.id}`)}
                      className="px-2 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition"
                    >
                      Editar
                    </button>
                    {/* Botón para cancelar (si no está cancelada) */}
                    {c.estado !== 'Cancelada' && (
                      <button
                        onClick={() => confirmCancel(c.id)}
                        className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de confirmación de cancelación */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
            {/* Botón de cerrar modal */}
            <button
              onClick={() => setShowCancelModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-semibold"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Confirmar Cancelación
            </h3>
            <p className="text-gray-600 text-center mb-6">
              ¿Estás seguro de cancelar esta cita?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Sí, cancelar
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                No, volver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de exportación */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
            {/* Botón de cerrar modal */}
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-semibold"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Exportar Citas
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              Selecciona formatos a exportar:
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exportCSV}
                  onChange={() => setExportCSV((prev) => !prev)}
                  className="form-checkbox h-5 w-5 text-green-500"
                />
                <span className="text-gray-700">CSV</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exportExcel}
                  onChange={() => setExportExcel((prev) => !prev)}
                  className="form-checkbox h-5 w-5 text-green-500"
                />
                <span className="text-gray-700">Excel</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exportPDF}
                  onChange={() => setExportPDF((prev) => !prev)}
                  className="form-checkbox h-5 w-5 text-green-500"
                />
                <span className="text-gray-700">PDF</span>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={performExport}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Exportar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
