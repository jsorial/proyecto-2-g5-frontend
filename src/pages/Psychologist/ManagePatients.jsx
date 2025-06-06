// src/pages/Psychologist/ManagePatients.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManagePatients() {
  const navigate = useNavigate();

  // Estado completo de pacientes (simulado o traído desde API)
  const [patients, setPatients] = useState([]);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos'); // 'Todos' | 'Activo' | 'Inactivo'

  // Estado del modal de exportación
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportCSV, setExportCSV] = useState(false);
  const [exportExcel, setExportExcel] = useState(false);
  const [exportPDF, setExportPDF] = useState(false);

  useEffect(() => {
    // Simular fetch('/api/psych/patients')
    const datosSimulados = [
      {
        idDoc: '12345678',
        nombres: 'Juan Carlos',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'Gómez',
        tipoDoc: 'DNI',
        celular: '987654321',
        emailPersonal: 'jc.perez@gmail.com',
        genero: 'Masculino',
        fechaNacimiento: '1990-05-12',
        estado: 'Activo',
        createdAt: '2025-02-15',
      },
      {
        idDoc: '87654321',
        nombres: 'María Fernanda',
        apellidoPaterno: 'López',
        apellidoMaterno: 'Romero',
        tipoDoc: 'DNI',
        celular: '912345678',
        emailPersonal: 'mf.lopez@gmail.com',
        genero: 'Femenino',
        fechaNacimiento: '1988-08-20',
        estado: 'Inactivo',
        createdAt: '2024-10-01',
      },
    ];
    setPatients(datosSimulados);
  }, []);

  // Manejar habilitar / deshabilitar paciente
  const toggleEnable = (idDoc) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.idDoc === idDoc
          ? { ...p, estado: p.estado === 'Activo' ? 'Inactivo' : 'Activo' }
          : p
      )
    );
    alert(
      `Paciente ${idDoc} ${
        patients.find((p) => p.idDoc === idDoc)?.estado === 'Activo'
          ? 'deshabilitado'
          : 'habilitado'
      }.`
    );
  };

  // Filtrar por búsqueda y estado
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.idDoc.includes(searchTerm.trim()) ||
      `${p.nombres} ${p.apellidoPaterno} ${p.apellidoMaterno}`
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
    const matchesStatus =
      statusFilter === 'Todos' || p.estado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Funciones de exportación
  const performExport = () => {
    if (!exportCSV && !exportExcel && !exportPDF) {
      alert('Selecciona al menos un formato para exportar.');
      return;
    }
    if (exportCSV) exportToCSV();
    if (exportExcel) exportToExcel();
    if (exportPDF) exportToPDF();
    // Cerrar modal y resetear opciones
    setShowExportModal(false);
    setExportCSV(false);
    setExportExcel(false);
    setExportPDF(false);
  };

  const exportToCSV = () => {
    if (patients.length === 0) {
      alert('No hay datos para exportar a CSV.');
      return;
    }
    const header = [
      'ID Documento',
      'Nombres',
      'Apellido Paterno',
      'Apellido Materno',
      'Tipo Doc',
      'Número Doc',
      'Celular',
      'Correo Personal',
      'Género',
      'Fecha Nacimiento',
      'Estado',
      'Creado En',
    ];
    const rows = patients.map((p) => [
      p.idDoc,
      p.nombres,
      p.apellidoPaterno,
      p.apellidoMaterno,
      p.tipoDoc,
      p.idDoc,
      p.celular,
      p.emailPersonal,
      p.genero,
      p.fechaNacimiento,
      p.estado,
      p.createdAt,
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
    link.setAttribute('download', `pacientes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    // Simulación de exportación a Excel; en un caso real usarías una librería como SheetJS (xlsx)
    alert('Exportando a Excel... (simulación)');
  };

  const exportToPDF = () => {
    // Simulación de exportación a PDF; en un caso real usarías jsPDF o similar
    alert('Exportando a PDF... (simulación)');
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Gestión de Pacientes
      </h2>

      {/* Botones de acciones */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Crear nuevo paciente */}
        <button
          onClick={() => navigate('/psych/create-patient')}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
        >
          + Crear Paciente
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
        {/* Buscador por ID o nombre */}
        <input
          type="text"
          placeholder="Buscar por ID o nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        {/* Filtro de estado */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-1/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <option value="Todos">Todos</option>
          <option value="Activo">Activos</option>
          <option value="Inactivo">Inactivos</option>
        </select>
      </div>

      {/* Tabla de pacientes */}
      {filteredPatients.length === 0 ? (
        <p className="text-gray-600 text-center">No se encontraron pacientes.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left text-gray-700">ID Documento</th>
                <th className="border px-4 py-2 text-left text-gray-700">Nombres</th>
                <th className="border px-4 py-2 text-left text-gray-700">
                  Apellidos
                </th>
                <th className="border px-4 py-2 text-left text-gray-700">
                  Tipo Doc
                </th>
                <th className="border px-4 py-2 text-left text-gray-700">Email</th>
                <th className="border px-4 py-2 text-left text-gray-700">Celular</th>
                <th className="border px-4 py-2 text-left text-gray-700">Estado</th>
                <th className="border px-4 py-2 text-left text-gray-700">Creado</th>
                <th className="border px-4 py-2 text-center text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p.idDoc} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{p.idDoc}</td>
                  <td className="border px-4 py-2">{p.nombres}</td>
                  <td className="border px-4 py-2">
                    {p.apellidoPaterno} {p.apellidoMaterno}
                  </td>
                  <td className="border px-4 py-2">{p.tipoDoc}</td>
                  <td className="border px-4 py-2">{p.emailPersonal}</td>
                  <td className="border px-4 py-2">{p.celular}</td>
                  <td
                    className={`border px-4 py-2 font-medium ${
                      p.estado === 'Activo' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {p.estado}
                  </td>
                  <td className="border px-4 py-2">{p.createdAt}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    {/* Botón para editar */}
                    <button
                      onClick={() => navigate(`/psych/edit-patient/${p.idDoc}`)}
                      className="px-2 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition"
                    >
                      Editar
                    </button>
                    {/* Botón para habilitar/deshabilitar */}
                    <button
                      onClick={() => toggleEnable(p.idDoc)}
                      className={`px-2 py-1 text-white text-sm rounded transition ${
                        p.estado === 'Activo'
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {p.estado === 'Activo' ? 'Deshabilitar' : 'Habilitar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de exportación */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
            {/* Botón de cerrar */}
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Exportar Pacientes
            </h3>

            <p className="text-gray-600 mb-4">
              Selecciona los formatos a exportar:
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
