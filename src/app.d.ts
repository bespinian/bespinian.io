// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			customer?: {
				en: import('$lib/customers/Customer').Customer;
				de: import('$lib/customers/Customer').Customer;
				logo: string;
			};
		}
		// interface Platform {}
	}
}

export {};
