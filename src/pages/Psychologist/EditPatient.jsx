// src/pages/Psychologist/EditPatient.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Importa tu JSON con al menos 15 pacientes
import patientsData from '../../data/patients.json';

export default function EditPatient() {
  const { idDoc } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const paciente = patientsData.find((p) => p.idDoc === idDoc);
    if (!paciente) {
      alert('Paciente no encontrado');
      navigate('/psych/manage-patients');
      return;
    }
    setFormData(paciente);
  }, [idDoc, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Paciente ${idDoc} actualizado con éxito.`);
    navigate('/psych/manage-patients');
  };

  if (!formData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-formBtn border-t-primaryBtn rounded-full animate-spin" />
        <p className="ml-4 text-formTitle font-medium">Cargando paciente…</p>
      </div>
    );
  }

  return (

    // 1) Este es el fondo “global” fuera del card
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-2">
      {/* 2) Centras y acotas el ancho del “card” blanco */}
      <div className="relative max-w-3xl mx-auto mt-8 mb-12 bg-white p-8 rounded-lg shadow border border-gray-200">
        {/* Cerrar con tu equis */}
        <button
          onClick={() => navigate('/psych/manage-patients')}
          className="absolute top-6 right-2 bg-white rounded-full p-1 hover:bg-gray-100 transition"
          aria-label="Cerrar"
        >
          <img
            src="/images/Equis_de_cuestionarios.png"
            alt="Cerrar"
            className="h-10 w-10"
          />
        </button>

        <h2 className="text-2xl font-semibold text-formTitle mb-6 text-center">
          Editar Paciente: {idDoc}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombres */}
          <div>
            <label className="block text-formTitle mb-1">Nombres *</label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
            />
          </div>

          {/* Apellidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-formTitle mb-1">Apellido Paterno *</label>
              <input
                type="text"
                name="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
            <div>
              <label className="block text-formTitle mb-1">Apellido Materno *</label>
              <input
                type="text"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
          </div>

          {/* Documento y tipo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-formTitle mb-1">Tipo de Documento *</label>
              <select
                name="tipoDoc"
                value={formData.tipoDoc}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              >
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Carnet Extranjería">C. Extranjería</option>
              </select>
            </div>
            <div>
              <label className="block text-formTitle mb-1">Número de Documento *</label>
              <input
                type="text"
                name="idDoc"
                value={formData.idDoc}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600"
              />
              <span className="text-sm text-gray-500">No editable.</span>
            </div>
          </div>

          {/* Teléfono y correo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-formTitle mb-1">Celular *</label>
              <input
                type="text"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
            <div>
              <label className="block text-formTitle mb-1">Correo *</label>
              <input
                type="email"
                name="emailPersonal"
                value={formData.emailPersonal}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
          </div>

          {/* Género y fecha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-formTitle mb-1">Género *</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-formTitle mb-1">Fecha de Nacimiento *</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            </div>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-formTitle mb-1">Estado</label>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate('/psych/manage-patients')}
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
