import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  plugins: [react()],
  preview: {
    port: parseInt(process.env.PORT || '3000'), // Use PORT from environment or default to 3000
    host: '0.0.0.0', // Bind to 0.0.0.0 for Render compatibility
    allowedHosts: ['search-candidate-6.onrender.com'], // Add your Render host here
  },
});
