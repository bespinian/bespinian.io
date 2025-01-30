// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			customer?: {
				en: import('$lib/customers/Customer').Customer;
				de: import('$lib/customers/Customer').Customer;
				logoDe: string;
				logoEn: string;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
