import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		csp: {
			directives: {
				'default-src': ['self'],
				'script-src': [
					'unsafe-eval',
					'unsafe-inline',
					'self',
					'https://www.googletagmanager.com',
					'https://www.google-analytics.com'
				],
				'style-src': ['unsafe-inline', 'self'],
				'img-src': [
					'self',
					'data:',
					'https://www.googletagmanager.com',
					'https://www.google-analytics.com'
				],
				'connect-src': ['*'],
				'object-src': ['none'],
				'form-action': ['https://formspree.io']
			}
		}
	}
};

export default config;
