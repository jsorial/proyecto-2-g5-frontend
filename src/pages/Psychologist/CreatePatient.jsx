// src/pages/Psychologist/CreatePatient.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePatient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    tipoDoc: 'DNI',
    idDoc: '',
    celular: '',
    emailPersonal: '',
    genero: 'Masculino',
    fechaNacimiento: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Paciente ${formData.idDoc} creado con éxito.`);
    navigate('/psych/manage-patients');
  };

  return (
    // 1) Este es el fondo “global” fuera del card
    <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-2">
      {/* 2) Centras y acotas el ancho del “card” blanco */}
      <div className="relative max-w-3xl mx-auto mt-8 mb-12 bg-white p-8 rounded-lg shadow border border-gray-200">
        {/* Botón de cerrar con la “X” */}
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
          Crear Nuevo Paciente
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
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
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

          {/* Género y fecha de nacimiento */}
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
              Guardar Paciente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
