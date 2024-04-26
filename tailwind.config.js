/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily:{
        "roboto": ['Roboto', 'sans-serif']
      },
      colors: {
        // ANTIGUA PALETA DE COLORES

        // "Azul-Fuerte": "#161A30",
        // "Azul-oscuro": "#31304D",
        // "Gris-claro": "#B6BBC4",
        // "Blanco-cremoso": "#F0ECE5",
        // "Azul-Medianoche": "#2D3250",
        // "Azul-Crepúsculo": "#424769",
        // "Azul-Neblina": "#7077A1",
        // "Naranja Cálido":"#F6B17A",
        
        // NUEVA PALETA DE COLORES
        
        "Rich black": "#04061A",
        "Malachite":"#1AD361",
        "Space cadet":"#2D3250",
        "Blue":"#0A05FE",
        "Dark purple":"#360536",
        "WhatsApp": "#4FCE5D",
        "Navbar": "#D9D9D9",

      },
      backgroundImage: {
        "imagen-fondo": "url('/Fondo-inicio.png')",
        "portada-perfil":"url('Portada-perfil-estudiante.png')",
      },
    }
  },
  plugins: [],
}

