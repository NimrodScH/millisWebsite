import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Use polling for file changes if necessary
      ignored: ['!**/src/**'], // Ensure all files in `src` are watched
    },
  },
  build: {
    outDir: '../backend/dist/public', // Output to backend/dist/public
    sourcemap: true, // Enable source maps for debugging
    emptyOutDir: true, // Clears the directory before building
    rollupOptions: {
      input: '/src/Main.tsx', // Ensure the entry point is correct
      output: {
        entryFileNames: `[name].js`, // Ensure the correct file extension
        chunkFileNames: `[name]-[hash].js`,
        assetFileNames: `[name]-[hash][extname]`,
      },
    },
  },
});
