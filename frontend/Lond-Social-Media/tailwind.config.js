// frontend/Lond-Social-Media/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				lato: ['Lato', 'sans-serif'],
				barlow: ['Barlow', 'sans-serif'],
			},
			// Rimuoviamo 'colors', 'backgroundColor', 'textColor', 'borderColor' da qui per ora
			// Potremmo reintrodurre 'borderRadius' e 'spacing' se necessario dopo,
			// ma concentriamoci prima sui colori.
		},
	},
	plugins: [],
};
