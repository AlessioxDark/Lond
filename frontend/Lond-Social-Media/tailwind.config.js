/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
      },
      colors: {
        'lond-dark': '#18181B',        // Sfondo principale molto scuro
        'lond-gray': '#27272A',        // Sfondo per card/elementi secondari
        'lond-light-gray': '#A1A1AA',  // Testo/icone secondarie
        'lond-text-primary': '#F4F4F5',// Testo principale
        'lond-accent': '#3B82F6',      // Blu vibrante come accento
        'lond-accent-hover': '#2563EB', // Blu più scuro per hover sull'accento
        'lond-green': '#10B981',      // Verde per successo o "online"
        'lond-red': '#EF4444',        // Rosso per errori o notifiche
        'lond-yellow': '#F59E0B',     // Giallo per avvisi
      },
      borderRadius: {
        '4xl': '2rem', // Esempio di bordo più grande se necessario
      },
      spacing: {
        '100': '25rem',
        '120': '30rem',
      }
    },
  },
  plugins: [],
}
