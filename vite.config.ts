import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    // @ts-expect-error The NodeNext declaration resolves to the module namespace instead of its callable default export.
    federation({
      name: 'master_mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './MasterApp': './src/App.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: { port: 5001 },
  preview: { port: 5001 },
});
