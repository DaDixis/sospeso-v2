// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import compression from 'vite-plugin-compression';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sospesosthlm.com',
  integrations: [sitemap()],
  image: {
    // Enable responsive images globally with constrained layout
    layout: 'constrained',
    // Add CSS for responsive image resizing
    responsiveStyles: true,
  },
  vite: {
    plugins: [
      tailwindcss(),
      // Generate gzip compressed files for production
      compression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      // Generate brotli compressed files for production
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
    ],
    server: {
      host: true,
      allowedHosts: ['.ngrok-free.app', '.ngrok.io'],
    },
  },
});