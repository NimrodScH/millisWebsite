import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../backend/dist/public'), // Absolute path for `outDir`
    emptyOutDir: true, // Ensure the directory is emptied before building
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.tsx'), // Ensure correct entry point
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name]-[hash].js`,
        assetFileNames: `[name]-[hash][extname]`,
      },
    },
  },
});
