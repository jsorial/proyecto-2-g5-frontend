// src/pages/Psychologist/EditAppointment.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditAppointment() {
  const { id } = useParams(); // ID de la cita en la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pacienteId: '',
    pacienteNombre: '',
    psicologa: '',
    fecha: '',
    hora: '',
    pagado: false,
    estado: '',
  });

  useEffect(() => {
    // Simular fetch(`/api/psych/appointments/${id}`)
    const citaSimulada = {
      id: parseInt(id, 10),
      pacienteId: '12345678',
      pacienteNombre: 'Juan Carlos Pérez',
      psicologa: 'Dra. López',
      fecha: '2025-06-10',
      hora: '10:00',
      pagado: true,
      estado: 'Confirmada',
    };
    setFormData(citaSimulada);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar campos obligatorios
    const { pacienteId, pacienteNombre, psicologa, fecha, hora, estado } = formData;
    if (!pacienteId || !pacienteNombre || !psicologa || !fecha || !hora || !estado) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }
    // Aquí iría el PUT a la API:
    // fetch(`/api/psych/appointments/${id}`, { method: 'PUT', body: JSON.stringify(formData) })
    alert(`Cita ${id} actualizada con éxito.`);
    navigate('/psych/manage-appointments');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Editar Cita #{id}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Paciente ID y Nombre (editable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">ID Paciente *</label>
            <input
              type="text"
              name="pacienteId"
              value={formData.pacienteId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Nombre Paciente *</label>
            <input
              type="text"
              name="pacienteNombre"
              value={formData.pacienteNombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>

        {/* Psicóloga */}
        <div>
          <label className="block text-gray-700 mb-1">Psicóloga *</label>
          <input
            type="text"
            name="psicologa"
            value={formData.psicologa}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Fecha y Hora */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Fecha *</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Hora *</label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>

        {/* Pagado y Estado (editable) */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="pagado"
              checked={formData.pagado}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-green-500"
            />
            <span className="text-gray-700">Pagado</span>
          </label>
          <label className="block text-gray-700">
            Estado
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="ml-2 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </label>
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate('/psych/manage-appointments')}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
