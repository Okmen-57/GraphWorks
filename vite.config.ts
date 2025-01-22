import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Set the output directory to 'build'
    emptyOutDir: true, // Clear the 'build' folder before each build
  },
});
