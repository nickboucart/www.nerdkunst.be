import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
        exclude: ["svelte-codemirror-editor", "codemirror", "@codemirror/language-javascript" /* ... */],
    },
    resolve: {
        alias: {
          '@codemirror/state': path.resolve(__dirname, 'node_modules/@codemirror/state/dist/index.js'),
        }
    }
});
