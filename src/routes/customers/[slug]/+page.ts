import { error } from '@sveltejs/kit';
import citechEn from '$lib/customers/citechsensors-en.json';
import citechDe from '$lib/customers/citechsensors-de.json';
import citechLogo from '$lib/images/citechsensors-wide.webp';
import swisssignEn from '$lib/customers/swisssigngroup-en.json';
import swisssignDe from '$lib/customers/swisssigngroup-de.json';
import swisssignLogo from '$lib/images/swisssigngroup.svg';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	switch (params.slug) {
		case 'citech-sensors':
			return {
				customer: {
					en: citechEn,
					de: citechDe,
					logo: citechLogo
				}
			};
		case 'swisssign-group':
			return {
				customer: {
					en: swisssignEn,
					de: swisssignDe,
					logo: swisssignLogo
				}
			};
	}

	throw error(404, 'Not found');
};
