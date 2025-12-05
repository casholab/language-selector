import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CasholabLS',
      formats: ['iife'],
      fileName: () => 'loader.js'
    },
    outDir: 'dist',
    minify: 'esbuild'
  }
});

