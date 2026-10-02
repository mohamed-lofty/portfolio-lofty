import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  return {
    plugins: [react()],
    build: {
      target: 'es2020',
      cssTarget: 'chrome111',
    },
    server: {
      port: 5173,
    },
    preview: {
      port: 4173,
    },
    base: env.VITE_BASE_PATH || '/portfolio-lofty',
  };
});
