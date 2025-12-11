// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sospesosthlm.com',
  integrations: [sitemap()],
  build: {
    // Inline all CSS to eliminate render-blocking stylesheets
    inlineStylesheets: 'always',
  },
  image: {
    // Enable responsive images globally with constrained layout
    layout: 'constrained',
    // Add CSS for responsive image resizing
    responsiveStyles: true,
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      host: true,
      allowedHosts: ['.ngrok-free.app', '.ngrok.io'],
    },
  },
});