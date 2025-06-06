// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-loginBg border-t border-navbarUnderline">
      <div className="max-w-7xl mx-auto py-8 px-6 sm:px-8 lg:px-10 text-center">
        {/* Derechos */}
        <p className="font-semibold text-primaryText">
          © {new Date().getFullYear()} Centro Psicológico CEM. Todos los derechos reservados.
        </p>


        {/* Separador
        <div className="mt-6 border-t border-navbarUnderline" />

        {/* Redes sociales 
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primaryBtn transition"
          >
            <span className="sr-only">Facebook</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.845c0-2.506 1.492-3.89 3.778-3.89 1.094 0 2.238.195 2.238.195v2.465h-1.261c-1.243 0-1.631.771-1.631 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primaryBtn transition"
          >
            <span className="sr-only">Twitter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.945 13.945 0 011.671 3.149 4.916 4.916 0 003.195 9.72a4.903 4.903 0 01-2.228-.616v.06a4.916 4.916 0 003.946 4.817 4.903 4.903 0 01-2.224.085 4.918 4.918 0 004.59 3.417 9.868 9.868 0 01-6.102 2.104c-.396 0-.788-.023-1.176-.069a13.945 13.945 0 007.548 2.212c9.057 0 14.01-7.513 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primaryBtn transition"
          >
            <span className="sr-only">Instagram</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.34 3.608 1.315.975.975 1.252 2.242 1.315 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849a5.504 5.504 0 01-1.315 3.608 5.504 5.504 0 01-3.608 1.315c-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07a5.497 5.497 0 01-3.607-1.315 5.497 5.497 0 01-1.315-3.608c-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849a5.504 5.504 0 011.315-3.608 5.504 5.504 0 013.608-1.315c1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.012 7.052.07 5.767.128 4.533.407 3.503 1.436c-1.03 1.03-1.308 2.264-1.366 3.549C2.012 6.333 2 6.741 2 10s.012 3.667.07 4.947c.058 1.285.336 2.519 1.366 3.549 1.03 1.03 2.264 1.308 3.549 1.366C8.333 18.988 8.741 19 12 19s3.667-.012 4.947-.07c1.285-.058 2.519-.336 3.549-1.366 1.03-1.03 1.308-2.264 1.366-3.549.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.285-.336-2.519-1.366-3.549C19.466.407 18.232.128 16.947.07 15.667.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
            </svg>
          </a>
        </div> */}
      </div>
    </footer>
  );
}
