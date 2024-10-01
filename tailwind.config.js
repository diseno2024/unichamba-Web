/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      gridTemplateColumns: {
        'custom': '1fr 2.2fr 1fr'
      },

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
        
        "Malachite":"#1AD361",
        "Space-cadet":"#2D3250",
        "Blue":"#0A05FE",
        "Dark-purple":"#360536",
        "WhatsApp": "#4FCE5D",
        "Navbar": "#D9D9D9",
        "Dark-Blue": "#04061A",
        "bg-icon": "#0D541E",
        "Azul-Neblina": "#7077A1"

      },
      backgroundImage: {
        "portada":"url('/segunda-portada.jpg')",
        "open-menu":"url(/menu.svg)",
        "close-menu":"url(/close.svg)",
        "banner":"url('/bg_banner.png')",
        "bannerOferta":"url('/carruselOferta.png')",
        "estudiante":"url('/the-dream-archives-BqD0Id4qemc-unsplash.jpg')",
        "oferta":"url('/oferta.jpg')"
      },
      width: {
        '670': '670px',
      },
      screens:{
        'phone': '320px',
      }
      
    }
  },
  plugins: [],
}