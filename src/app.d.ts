declare module 'svelte-carousel';
declare module '@beyonk/svelte-google-analytics';
declare module '@beyonk/gdpr-cookie-consent-banner';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface PageData {
		customer?: {
			en: import('$lib/customers/Customer').Customer;
			de: import('$lib/customers/Customer').Customer;
			logo: string;
		};
	}
}
