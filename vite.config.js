import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile({
      removeViteModuleLoader: true,
    }),
    // Custom plugin to copy stories-data.json to the build output
    {
      name: 'copy-stories-data',
      writeBundle() {
        const srcPath = path.resolve(__dirname, 'src/stories-data.json');
        const destPath = path.resolve(__dirname, 'dist/stories-data.json');
        
        if (fs.existsSync(srcPath)) {
          // Ensure the destination directory exists
          fs.mkdirSync(path.dirname(destPath), { recursive: true });
          
          // Copy the file
          fs.copyFileSync(srcPath, destPath);
          console.log('Copied stories-data.json to build output');
          
          // Verify the file was copied correctly
          if (fs.existsSync(destPath)) {
            const srcSize = fs.statSync(srcPath).size;
            const destSize = fs.statSync(destPath).size;
            console.log(`Verified copy: ${srcSize} bytes -> ${destSize} bytes`);
          } else {
            console.error('Failed to copy stories-data.json to build output');
          }
        } else {
          console.error('stories-data.json not found at', srcPath);
        }
      }
    }
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
  base: '/sxsf/' // This ensures assets are loaded correctly on GitHub Pages
});
