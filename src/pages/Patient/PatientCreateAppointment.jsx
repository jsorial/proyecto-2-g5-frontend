// src/pages/Patient/CreateAppointment.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext'; // coméntalo si no tienes auth

// Si no hay auth, simulamos un paciente “demo”
const DEMO_USER = {
    pacienteId: '00000000',
    pacienteNombre: 'Juan Carlos Rodriguez',
};

const PSICOLOGAS = [
    'Dra. María López',
    'Dra. Carmen Gutiérrez',
    'Dra. Ana Ruiz',
];

export default function PatientCreateAppointment() {
    const navigate = useNavigate();
    // const { user } = useAuth() || {};  
    // sustituye la línea anterior por esta para pruebas:
    const user = /* useAuth()?.user */ null;
    const paciente = user || DEMO_USER;

    const [formData, setFormData] = useState({
        psicologa: '',
        fecha: '',
        hora: '',
        modalidad: 'Presencial',
    });

    const isValid = formData.psicologa && formData.fecha && formData.hora;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return alert('Por favor completa todos los campos.');
        // Simulamos envío:
        console.log('Creando cita', {
            pacienteId: paciente.pacienteId,
            pacienteNombre: paciente.pacienteNombre,
            ...formData,
        });
        alert(`Cita agendada para ${paciente.pacienteNombre} con ${formData.psicologa} el ${formData.fecha} a las ${formData.hora}.`);
        navigate('/patient/appointments');
    };

    return (
        <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen py-2">
            {/* 2) Centras y acotas el ancho del “card” blanco */}
            <div className="relative max-w-3xl mx-auto mt-8 mb-12 bg-white p-8 rounded-lg shadow border border-gray-200">
                <button
                    onClick={() => navigate('/patient/appointments')}
                    className="absolute top-4 right-4 focus:outline-none"
                    aria-label="Cerrar"
                >
                    <img
                        src="/images/Equis_de_cuestionarios.png"
                        alt="Cerrar"
                        className="h-10 w-10"
                    />
                </button>

                <h2 className="text-2xl font-semibold text-formTitle mb-6 text-center">
                    Agendar Nueva Cita
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-formTitle mb-1">Paciente</label>
                        <input
                            type="text"
                            value={paciente.pacienteNombre}
                            disabled
                            className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-formTitle mb-1">Psicóloga *</label>
                        <select
                            name="psicologa"
                            value={formData.psicologa}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                        >
                            <option value="">-- Selecciona --</option>
                            {PSICOLOGAS.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

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

                    <div>
                        <label className="block text-formTitle mb-1">Modalidad *</label>
                        <select
                            name="modalidad"
                            value={formData.modalidad}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                        >
                            <option value="Presencial">Presencial</option>
                            <option value="Online">Online</option>
                        </select>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/patient/appointments')}
                            className="px-4 py-2 bg-primaryBtn text-white font-medium rounded hover:bg-primaryTextActive transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`px-4 py-2 font-medium rounded transition
    ${isValid
                                    ? 'bg-formBtn text-white hover:bg-primaryTextActive cursor-pointer'
                                    : 'bg-formBtn text-white cursor-not-allowed'}`}
                        >
                            Agendar Cita
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}
