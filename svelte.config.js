import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		csp: {
			directives: {
				'default-src': ['self'],
				'script-src': ['unsafe-eval', 'unsafe-inline', 'self'],
				'style-src': ['unsafe-inline', 'self'],
				'img-src': ['self', 'data:'],
				'connect-src': ['*'],
				'object-src': ['none'],
				'form-action': ['https://formspree.io']
			}
		}
	}
};

export default config;
