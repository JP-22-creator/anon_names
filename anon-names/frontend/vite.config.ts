import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/names': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
      },

    },
  },
});
