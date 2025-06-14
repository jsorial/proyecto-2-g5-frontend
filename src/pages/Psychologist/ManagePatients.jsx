// src/pages/Psychologist/ManagePatients.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL_PACIENTES } from '../../config';

const ITEMS_PER_PAGE = 5;

export default function ManagePatients() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [genderFilter, setGenderFilter] = useState('Todos');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [showExportModal, setShowExportModal] = useState(false);
  const [exportCSV, setExportCSV] = useState(false);
  const [exportExcel, setExportExcel] = useState(false);
  const [exportPDF, setExportPDF] = useState(false);

  useEffect(() => {
    async function loadPatients() {
      try {
        const res = await fetch(`${API_URL_PACIENTES}/patients.json`);
        if (!res.ok) throw new Error('Fetch failed');
        setPatients(await res.json());
      } catch {
        const local = await import('../../data/patients.json');
        setPatients(local.default);
      }
    }
    loadPatients();
  }, []);

  const toggleEnable = (idDoc) => {
    setPatients(prev =>
      prev.map(p =>
        p.idDoc === idDoc
          ? { ...p, estado: p.estado === 'Activo' ? 'Inactivo' : 'Activo' }
          : p
      )
    );
  };

  const filtered = patients.filter(p => {
    const term = searchTerm.trim().toLowerCase();
    const matchSearch =
      p.idDoc.includes(term) ||
      `${p.nombres} ${p.apellidoPaterno} ${p.apellidoMaterno}`.toLowerCase().includes(term);
    const matchStatus = statusFilter === 'Todos' || p.estado === statusFilter;
    const matchGender = genderFilter === 'Todos' || p.genero === genderFilter;
    let matchDate = true;
    if (dateFrom) matchDate = new Date(p.createdAt) >= new Date(dateFrom);
    if (dateTo) matchDate = matchDate && new Date(p.createdAt) <= new Date(dateTo);
    return matchSearch && matchStatus && matchGender && matchDate;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
  // exportToCSV, exportToExcel, exportToPDF idénticas a las previas

  return (
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-4 px-4">
      <div className="relative max-w-6xl mx-auto mt-8 mb-12 bg-white p-6 rounded-lg shadow border border-gray-200">
        {/* Cerrar ventana */}
        <button
          onClick={() => navigate('/psych/home')}
          className="absolute top-10 right-4 bg-white rounded-full p-1 hover:bg-gray-100 transition"
        >
          <img src="/images/Equis_de_cuestionarios.png" alt="Cerrar" className="h-10 w-10" />
        </button>

        {/* Cabecera con logo Blue + título */}
        <div className="flex items-center justify-center mb-6 space-x-4">
          <img src="/images/Blue.png" alt="Blue tu guía" className="w-20 h-20" />
          <h2 className="text-2xl font-semibold text-formTitle">
            Gestión de Pacientes
          </h2>
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <button
            onClick={() => navigate('/psych/create-patient')}
            className="px-4 py-2 bg-formBtn text-white rounded hover:bg-primaryTextActive transition"
          >
            + Crear Paciente
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-primaryBtn text-white rounded hover:bg-primaryTextActive transition"
          >
            Exportar
          </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          <input
            type="text"
            placeholder="Buscar Nro. Doc. o nombre..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="border border-gray-300 rounded px-2 py-2 focus:ring-2 focus:ring-primaryBtn"
          />
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primaryBtn"
          >
            <option value="Todos">Estado: Todos</option>
            <option value="Activo">Activos</option>
            <option value="Inactivo">Inactivos</option>
          </select>
          <select
            value={genderFilter}
            onChange={e => { setGenderFilter(e.target.value); setCurrentPage(1); }}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primaryBtn"
          >
            <option value="Todos">Género: Todos</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={e => { setDateFrom(e.target.value); setCurrentPage(1); }}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primaryBtn"
          />
          <input
            type="date"
            value={dateTo}
            onChange={e => { setDateTo(e.target.value); setCurrentPage(1); }}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primaryBtn"
          />
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-tableHeaderBg">
              <tr>
                {['Nro Doc.', 'Nombres', 'Apellidos', 'Tipo Doc.', 'Email', 'Celular', 'Estado', 'Creado', 'Acciones']
                  .map(th => <th key={th} className="border px-4 py-2 text-left text-white">{th}</th>)}
              </tr>
            </thead>
            <tbody>
              {pageData.map(p => (
                <tr key={p.idDoc} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{p.idDoc}</td>
                  <td className="border px-4 py-2">{p.nombres}</td>
                  <td className="border px-4 py-2">{p.apellidoPaterno} {p.apellidoMaterno}</td>
                  <td className="border px-4 py-2">{p.tipoDoc}</td>
                  <td className="border px-4 py-2">{p.emailPersonal}</td>
                  <td className="border px-4 py-2">{p.celular}</td>
                  <td className={`border px-4 py-2 font-medium ${p.estado === 'Activo' ? 'text-stateActive' : 'text-stateInactive'}`}>
                    {p.estado}
                  </td>
                  <td className="border px-4 py-2">{p.createdAt}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => navigate(`/psych/edit-patient/${p.idDoc}`)}
                      className="px-2 py-1 bg-formBtn text-white text-sm rounded hover:bg-primaryTextActive transition"
                    >Editar</button>
                    <button
                      onClick={() => toggleEnable(p.idDoc)}
                      className="px-2 py-1 bg-primaryBtn text-white text-sm rounded hover:bg-primaryTextActive transition"
                    >
                      {p.estado === 'Activo' ? 'Deshabilitar' : 'Habilitar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {/* Paginación mejorada */}
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            «
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`
        px-3 py-1 rounded-full font-medium transition
        ${page === currentPage
                  ? 'bg-primaryBtn text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
      `}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            »
          </button>
        </div>


        {/* Modal de exportación */}
        {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-80 p-6 relative shadow-lg">
              <button
                onClick={() => setShowExportModal(false)}
                className="absolute top-4 right-2 bg-white rounded-full p-1 hover:bg-gray-100 transition"
              >
                <img src="/images/Equis_de_cuestionarios.png" alt="Cerrar" className="h-10 w-10" />
              </button>
              <h3 className="text-xl font-semibold text-formTitle mb-4 text-center">
                Exportar Pacientes
              </h3>
              <div className="space-y-2">
                {['CSV', 'Excel', 'PDF'].map(type => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={{ CSV: exportCSV, Excel: exportExcel, PDF: exportPDF }[type]}
                      onChange={() => {
                        if (type === 'CSV') setExportCSV(v => !v);
                        if (type === 'Excel') setExportExcel(v => !v);
                        if (type === 'PDF') setExportPDF(v => !v);
                      }}
                      className="form-checkbox h-5 w-5 text-formBtn"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 bg-primaryBtn text-white rounded"
                >Cancelar</button>
                <button
                  onClick={performExport}
                  className="px-4 py-2 bg-formBtn text-white rounded"
                >Exportar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
