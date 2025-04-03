import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    // Remove viteSingleFile plugin as it's causing issues with assets
    
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
        } else {
          console.error('stories-data.json not found at', srcPath);
        }
      }
    },
    // Custom plugin to copy assets folder from root to the build output
    {
      name: 'copy-root-assets',
      writeBundle() {
        const rootAssetsPath = path.resolve(__dirname, 'assets');
        const destAssetsPath = path.resolve(__dirname, 'dist/assets');
        
        if (fs.existsSync(rootAssetsPath)) {
          // Ensure the destination directory exists
          fs.mkdirSync(destAssetsPath, { recursive: true });
          
          // Copy all files from the assets directory
          const copyDir = (src, dest) => {
            const entries = fs.readdirSync(src, { withFileTypes: true });
            
            for (const entry of entries) {
              const srcPath = path.join(src, entry.name);
              const destPath = path.join(dest, entry.name);
              
              if (entry.isDirectory()) {
                fs.mkdirSync(destPath, { recursive: true });
                copyDir(srcPath, destPath);
              } else {
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied ${entry.name} to ${destPath}`);
              }
            }
          };
          
          copyDir(rootAssetsPath, destAssetsPath);
          console.log(`Copied assets from ${rootAssetsPath} to ${destAssetsPath}`);
        } else {
          console.error('Assets directory not found at root level');
        }
      }
    },
    // Custom plugin to create 404.html for GitHub Pages SPA support
    {
      name: 'create-404-html',
      writeBundle() {
        const indexPath = path.resolve(__dirname, 'dist/index.html');
        const notFoundPath = path.resolve(__dirname, 'dist/404.html');
        
        if (fs.existsSync(indexPath)) {
          // Create a 404.html file with redirect script
          const notFoundContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    var pathSegmentsToKeep = 1;

    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
  Redirecting...
</body>
</html>
          `;
          
          fs.writeFileSync(notFoundPath, notFoundContent);
          console.log('Created 404.html for GitHub Pages SPA support');
          
          // Also update index.html to handle the redirect
          let indexContent = fs.readFileSync(indexPath, 'utf8');
          
          // Check if the redirect script is already in the index.html
          if (!indexContent.includes('Single Page Apps for GitHub Pages')) {
            // Find the head closing tag
            const headCloseIndex = indexContent.indexOf('</head>');
            
            if (headCloseIndex !== -1) {
              // Insert the redirect script before the head closing tag
              const redirectScript = `
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
              `;
              
              indexContent = indexContent.slice(0, headCloseIndex) + redirectScript + indexContent.slice(headCloseIndex);
              fs.writeFileSync(indexPath, indexContent);
              console.log('Updated index.html with redirect script');
            }
          }
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    // Don't use the singleFile approach
    rollupOptions: {
      output: {
        // Allow code splitting for better performance
        manualChunks: undefined,
      },
    },
    // Don't inline all assets, let them be loaded separately
    assetsInlineLimit: 0, // Don't inline any assets
  },
  base: '/sxsf/' // This ensures assets are loaded correctly on GitHub Pages
});
