import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile({
      removeViteModuleLoader: true,
    }),
  ],
  build: {
    outDir: 'dist',
    // Improve production build settings
    rollupOptions: {
      output: {
        manualChunks: undefined, // Disable code splitting for better compatibility
      },
    },
    // Ensure all assets are included in the build
    assetsInlineLimit: 0,
  },
  base: '/sxsf/', // This ensures assets are loaded correctly on GitHub Pages
  // Optimize dynamic imports
  optimizeDeps: {
    include: ['date-fns']
  }
});
