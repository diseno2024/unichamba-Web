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
        "Azul-Fuerte": "#161A30",
        "Azul-oscuro": "#31304D",
        "Gris-claro": "#B6BBC4",
        "Blanco-cremoso": "#F0ECE5",
        "Azul-Medianoche": "#2D3250",
        "Azul-Crepúsculo": "#424769",
        "Azul-Neblina": "#7077A1",
        "Naranja Cálido":"#F6B17A",
        "WhatsApp": "#4FCE5D",
        "Navbar": "#D9D9D9",
        "Filters" : "#EBEBEB"

      },
      backgroundImage: {
        "imagen-fondo": "url('/Fondo-inicio.png')",
      },
    }
  },
  plugins: [],
}

