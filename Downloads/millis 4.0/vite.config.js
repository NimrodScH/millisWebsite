"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)(),],
    server: {
        watch: {
            usePolling: true, // Use polling for file changes if necessary
            //ignored: ['!**/src/**'], // Ensure all files in `src` are watched
        },
    },
    build: {
        outDir: 'dist', // Ensure output goes to 'dist'
        sourcemap: true, // Enable source maps for debugging
        rollupOptions: {
            output: {
                entryFileNames: "[name].jsx", // Generate files with .js extensions
                chunkFileNames: "[name]-[hash].jsx",
                assetFileNames: "[name]-[hash][extname]",
            },
        },
    },

    
});
