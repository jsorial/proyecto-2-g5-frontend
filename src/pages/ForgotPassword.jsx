// src/pages/ForgotPassword.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        // Aquí llamarías a tu API para enviar el enlace de recuperación
        setSent(true)
    }

    return (
        <div className="flex h-[calc(100vh-10rem)]">
            {/* Imagen de Blue al lado izquierdo (oculta en móvil) */}
            <div className="hidden md:flex md:w-1/2 h-full items-center justify-center bg-loginBg">
                <img
                    src="/images/forgot2.jpg"
                    alt="Blue, tu guía"
                    className="object-cover w-full h-full"
                />
            </div>


            {/* Formulario */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-loginBg p-6">
                <div className="relative w-full max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                    {/* Botón “X” para cerrar y volver atrás */}
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="absolute top-6 right-4 bg-white rounded-full p-1 hover:bg-gray-100 transition"
                        aria-label="Cerrar"    >
                        <img
                            src="/images/Equis_de_cuestionarios.png"
                            alt="Cerrar"
                            className="h-10 w-10" />
                    </button>

                    <h2 className="text-2xl font-semibold text-primaryText text-center mb-6">
                        Recuperar Contraseña
                    </h2>

                    {sent ? (
                        <div className="text-center space-y-4">
                            <p className="text-gray-700">
                                Si existe una cuenta con <strong>{email}</strong>, recibirás un correo
                                con instrucciones para restablecer tu contraseña.
                            </p>
                            <button
                                onClick={() => navigate('/login?role=patient')}
                                className="w-full py-2 bg-formBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
                            >
                                Volver al Login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                                    placeholder="tucorreo@ejemplo.com"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-primaryBtn text-white font-medium rounded-lg hover:bg-primaryTextActive transition"
                            >
                                Enviar enlace de recuperación
                            </button>
                        </form>
                    )}

                    {!sent && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={() => navigate('/login?role=patient')}
                                className="text-primaryText font-normal hover:underline transition text-sm"
                            >
                                ← Volver al Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
