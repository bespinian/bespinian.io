// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
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
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
