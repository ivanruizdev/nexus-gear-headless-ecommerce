/** @type {import('tailwindcss').Config} */
export default {
  // Definimos las rutas donde Tailwind buscará clases para optimizar el CSS
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Definimos la paleta Nexus para que Erick la use como clases (ex: text-nexus-primary)
        nexus: {
          primary: '#00b377',
          secondary: '#0077b3',
          accent: '#7b2cbf',
        }
      },
      fontFamily: {
        // Registramos las fuentes que ya importaste en el index.html
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
      }
    },
  },
  plugins: [],
}