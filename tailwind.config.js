// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        /* Colores ya existentes que definimos antes */
        navbarBg:    '#c7d3e5',
        loginBg:     '#f0f8fc',
        primaryBtn:  '#6b85bb',
        primaryText: '#6b85bb',
        primaryTextActive: '#4f6ca5',

        /* Nuevos colores solicitados */
        formTitle:       '#55619e',  // para títulos de formularios
        formBtn:         '#58c9ec',  // para botones del formulario
        tableHeaderBg:   '#88a2d7',  // fondo de cabecera de tablas
        stateActive:     '#ea8bc5',  // estados activos
        stateInactive:   '#004aad',  // estados inactivos (y barra de progreso)
        progressBar:     '#004aad',  // alias para barra de progreso

        /* COLOR ÚNICO para la línea bajo la navbar: */
        navbarUnderline: '#a6b7d1',
      }
    }
  },
  plugins: []
};
