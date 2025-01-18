import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(),],
  server: {
    watch: {
      usePolling: true, // Use polling for file changes if necessary
      ignored: ['!**/src/**'], // Ensure all files in `src` are watched
    },
  },
  build: {
    outDir: 'dist', // Ensure output goes to 'dist'
    sourcemap: true, // Enable source maps for debugging
    rollupOptions: {
      output: {
        entryFileNames: `[name].jsx`, // Generate files with .js extensions
        chunkFileNames: `[name]-[hash].jsx`,
        assetFileNames: `[name]-[hash][extname]`,
      },
    },
  },
});
