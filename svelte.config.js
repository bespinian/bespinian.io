import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		csp: {
			directives: {
				'default-src': ['self'],
				'script-src': ['unsafe-inline', 'self', 'https://scripts.simpleanalyticscdn.com'],
				'connect-src': ['self', 'https://queue.simpleanalyticscdn.com'],
				'style-src': ['unsafe-inline', 'self'],
				'img-src': ['self', 'data:', 'https://queue.simpleanalyticscdn.com'],
				'font-src': ['self', 'data:'],
				'object-src': ['none'],
				'frame-ancestors': ['none'],
				'base-uri': ['none'],
				'form-action': ['https://formspree.io']
			}
		}
	}
};

export default config;
