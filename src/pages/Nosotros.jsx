// src/pages/Nosotros.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Nosotros() {
    const team = [
        {
            name: 'Dra. María López',
            role: 'Psicóloga Clínica',
            photo: '/images/stitch.png', // usará Blue.png
        },
        {
            name: 'Dra. Carmen Gutiérrez',
            role: 'Psicóloga Infantil',
            photo: null, // usará Blue.png
        },
        {
            name: 'Lic. Ana Torres',
            role: 'Logopeda',
            photo: '/images/stitch.png', // usará Blue.png
        },
        {
            name: 'Dr. Luis Ramírez',
            role: 'Neuropsicólogo',
            photo: null, // usará Blue.png
        },
    ];

    const defaultPhoto = '/images/Blue.png';

    return (
        <div className="bg-fondo_fuera_formularios_dentro_del_body min-h-screen">
            {/* Hero */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-primaryBtn opacity-20 transform -rotate-2"></div>
                <div className="relative z-10 text-center py-24">
                    <h1 className="text-5xl font-extrabold text-primaryText mb-4">Conócenos</h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto px-4">
                        Somos un equipo de profesionales apasionados por tu bienestar mental y emocional.
                    </p>
                </div>
            </header>

          {/* Misión & Visión */}
<section className="py-16 max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-2">
  {[{
    title: 'Nuestra Misión',
    text: `Brindar atención psicológica de excelencia, centrada en la persona, fomentando
           el autoconocimiento y la resiliencia.`
  },{
    title: 'Nuestra Visión',
    text: `Ser líderes en innovación terapéutica, acercando la salud mental a todos los
           rincones de la comunidad.`
  }].map((item, idx) => {
    const isOdd = idx % 2 === 0; // 0 → Misión, 1 → Visión
    return (
      <div
        key={item.title}
        className={`
          p-8 rounded-xl shadow-lg hover:shadow-2xl transition
          ${isOdd
            ? 'bg-white text-gray-800'
            : 'bg-primaryBtn text-white'
          }
        `}
      >
        <h2 className={`text-2xl font-semibold mb-3 ${isOdd ? 'text-primaryBtn' : 'text-white'}`}>
          {item.title}
        </h2>
        <p className={`${isOdd ? 'text-gray-700' : 'text-gray-200'}`}>
          {item.text}
        </p>
      </div>
    )
  })}
</section>

{/* Valores */}
<section className="py-16 bg-loginBg">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-semibold text-primaryText text-center mb-8">Nuestros Valores</h2>
    <div className="grid gap-8 md:grid-cols-3">
      {[
        { title: 'Empatía', desc: 'Conectamos contigo desde el corazón.' },
        { title: 'Profesionalismo', desc: 'Formación continua y rigurosa.' },
        { title: 'Confidencialidad', desc: 'Tu confianza es nuestro compromiso.' },
      ].map((v, idx) => {
        const isOdd = idx % 2 === 0; // alterna 0,2 con fondo primaryBtn
        return (
          <div
            key={v.title}
            className={`
              p-6 rounded-lg transform transition hover:scale-105
              ${isOdd
                ? 'bg-primaryBtn text-white border-none'
                : 'bg-white border-l-4 border-primaryBtn text-gray-800'
              }
            `}
          >
            <h3 className={`text-xl font-medium mb-2 ${isOdd ? 'text-white' : 'text-primaryText'}`}>
              {v.title}
            </h3>
            <p className={isOdd ? 'text-gray-200' : 'text-gray-700'}>
              {v.desc}
            </p>
          </div>
        )
      })}
    </div>
  </div>
</section>


            {/* Equipo */}
            {/* Equipo */}
            <section className="py-16 max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-semibold text-primaryText text-center mb-8">
                    Conoce a nuestro equipo
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((member, idx) => {
                        const isOdd = idx % 2 === 0; // 0,2,4... → posiciones impares para el usuario (1ª,3ª,5ª...)
                        return (
                            <div
                                key={member.name}
                                className={`
            relative rounded-xl overflow-hidden shadow-lg transition hover:shadow-xl
            ${isOdd ? 'bg-primaryBtn text-white' : 'bg-white'}
          `}
                            >
                                <img
                                    src={member.photo || defaultPhoto}
                                    alt={member.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4 text-center">
                                    <h3 className={`text-lg font-semibold ${isOdd ? 'text-white' : 'text-primaryText'}`}>
                                        {member.name}
                                    </h3>
                                    <p className={isOdd ? 'text-gray-200' : 'text-gray-600'}>
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-16 bg-primaryBtn">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-semibold text-white mb-4">
                        ¿Listo para comenzar tu camino hacia el bienestar?
                    </h2>
                    <Link
                        to="/login"
                        className="inline-block px-8 py-4 bg-white text-primaryBtn font-medium rounded-full hover:bg-gray-100 transition"
                    >
                        Realizar Test Psicométrico
                    </Link>
                </div>
            </section>
        </div>
    );
}
