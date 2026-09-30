import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  root: 'tech_history_timeline',
  plugins: [
    svelte({
      configFile: '../svelte.config.js'
    })
  ]
});
