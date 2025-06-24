import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		host: true, // oppure '0.0.0.0'
		port: 5173, // puoi scegliere un'altra porta se vuoi
	},
});
