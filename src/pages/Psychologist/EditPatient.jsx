// src/pages/Psychologist/EditPatient.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPatient() {
  const { idDoc } = useParams(); // parámetro en la URL
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
    estado: 'Activo', // aunque el rol de edición no debe cambiar el estado aquí
  });

  useEffect(() => {
    // Simular fetch(`/api/psych/patients/${idDoc}`) para obtener datos
    // Aquí usamos datos simulados según el idDoc:
    const pacienteSimulado = {
      idDoc: idDoc,
      nombres: 'Juan Carlos',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'Gómez',
      tipoDoc: 'DNI',
      celular: '987654321',
      emailPersonal: 'jc.perez@gmail.com',
      genero: 'Masculino',
      fechaNacimiento: '1990-05-12',
      estado: 'Activo',
    };
    setFormData(pacienteSimulado);
  }, [idDoc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí validarías que los campos obligatorios no estén vacíos,
    // que idDoc no cambie (no editable) y que emailPersonal no se duplique.
    // Luego llamarías al API para actualizar:
    // fetch(`/api/psych/patients/${idDoc}`, { method: 'PUT', body: JSON.stringify(formData) })

    alert(`Paciente ${idDoc} actualizado con éxito.`);
    navigate('/psych/manage-patients');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Editar Paciente: {idDoc}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombres */}
        <div>
          <label className="block text-gray-700 mb-1">Nombres *</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Apellidos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Apellido Paterno *</label>
            <input
              type="text"
              name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Apellido Materno *</label>
            <input
              type="text"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>

        {/* Documento y tipo (no editable el idDoc) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Tipo de Documento *</label>
            <select
              name="tipoDoc"
              value={formData.tipoDoc}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="DNI">DNI</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="Carnet Extranjería">C. Extranjería</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Número de Documento *</label>
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
            <label className="block text-gray-700 mb-1">Celular *</label>
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Correo Personal *</label>
            <input
              type="email"
              name="emailPersonal"
              value={formData.emailPersonal}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>

        {/* Género y fecha de nacimiento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Género *</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Fecha de Nacimiento *</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>

        {/* Estado (no se edita) */}
        <div>
          <label className="block text-gray-700 mb-1">Estado</label>
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
            className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
