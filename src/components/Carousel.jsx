// src/components/Carousel.jsx
import React, { useState } from 'react';

const slides = [
  {
    id: 1,
    imgSrc: '/images/img1.jpg',
    quote: 'Gracias a CEM, he aprendido a manejar mi ansiedad de forma efectiva.',
    author: 'Paciente A.',
  },
  {
    id: 2,
    imgSrc: '/images/img2.jpg',
    quote: 'Las herramientas que me brindaron aquí cambiaron mi vida.',
    author: 'Paciente B.',
  },
  {
    id: 3,
    imgSrc: '/images/img3.jpg',
    quote: 'El seguimiento de mi progreso me hace sentir acompañado en todo momento.',
    author: 'Paciente C.',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  if (!Array.isArray(slides) || slides.length === 0) return null;

  return (
    <div className="relative max-w-3xl mx-auto">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${
            index === current ? 'block' : 'hidden'
          } w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg shadow-lg`}
        >
          <img src={slide.imgSrc} alt={`Slide ${index}`} className="object-cover w-full h-full" />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded">
            <p className="italic">“{slide.quote}”</p>
            <p className="mt-2 text-right font-semibold">— {slide.author}</p>
          </div>
        </div>
      ))}

      {/* Controles */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-green-500 bg-opacity-70 hover:bg-green-600 text-white rounded-full p-2 focus:outline-none"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-500 bg-opacity-70 hover:bg-green-600 text-white rounded-full p-2 focus:outline-none"
      >
        ›
      </button>
    </div>
  );
}
