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
        outDir: '../backend/dist/public', // Output directly into backend/dist/public
        sourcemap: true, // Enable source maps for debugging
        rollupOptions: {
            output: {
                entryFileNames: "[name].js", // Generate files with .js extensions
                chunkFileNames: "[name]-[hash].js",
                assetFileNames: "[name]-[hash][extname]",
            },
        },
    },

    
});
