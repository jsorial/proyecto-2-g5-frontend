// src/pages/Psychologist/EditAppointment.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Importa el JSON directamente:
import appointmentsData from '../../data/appointments.json';

export default function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Busca en el array el objeto con el id que venga de la URL
    const cita = appointmentsData.find((c) => c.id === parseInt(id, 10));
    if (!cita) {
      alert('Cita no encontrada');
      navigate('/psych/manage-appointments');
      return;
    }
    setFormData(cita);
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí llamarías a tu API con formData…
    alert(`Cita #${id} actualizada con éxito.`);
    navigate('/psych/manage-appointments');
  };

  if (!formData) {
    return <p className="text-center mt-8">Cargando...</p>;
  }

  return (
    // 1) Este es el fondo “global” fuera del card
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-2">
      {/* 2) Centras y acotas el ancho del “card” blanco */}
      <div className="relative max-w-3xl mx-auto mt-8 mb-12 bg-white p-8 rounded-lg shadow border border-gray-200">
        <button
          onClick={() => navigate('/psych/manage-appointments')}
          className="absolute top-6 right-4 bg-white rounded-full p-1 hover:bg-gray-100 transition"
          aria-label="Cerrar"
        >
          <img
            src="/images/Equis_de_cuestionarios.png"
            alt="Cerrar"
            className="h-10 w-10"
          />
        </button>

        <h2 className="text-2xl font-semibold text-formTitle mb-6 text-center">
          Editar Cita #{id}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Paciente ID (no editable) y Nombre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-formTitle mb-1">ID Paciente</label>
              <input
                type="text"
                name="pacienteId"
                value={formData.pacienteId}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-formTitle mb-1">Nombre Paciente *</label>
              <input
                type="text"
                name="pacienteNombre"
                value={formData.paciente}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
          </div>

          {/* Psicóloga */}
          <div>
            <label className="block text-formTitle mb-1">Psicóloga *</label>
            <input
              type="text"
              name="psicologa"
              value={formData.psicologa}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
            />
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-formTitle mb-1">Fecha *</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
            <div>
              <label className="block text-formTitle mb-1">Hora *</label>
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
          </div>

          {/* Pagado y Estado */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="pagado"
                checked={formData.pagado}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-formBtn"
              />
              <span className="text-gray-700">Pagado</span>
            </label>
            <label className="block text-formTitle">
              Estado *
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                className="ml-2 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primaryText"
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
              className="px-4 py-2 bg-primaryBtn text-white font-medium rounded hover:bg-primaryTextActive transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-formBtn text-white font-medium rounded hover:bg-primaryTextActive transition"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
