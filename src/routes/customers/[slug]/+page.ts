import { error } from '@sveltejs/kit';
import citechEn from '$lib/customers/citechsensors-en.json';
import citechDe from '$lib/customers/citechsensors-de.json';
import citechLogo from '$lib/images/citechsensors-wide.webp';
import swisssignEn from '$lib/customers/swisssigngroup-en.json';
import swisssignDe from '$lib/customers/swisssigngroup-de.json';
import swisssignLogo from '$lib/images/swisssigngroup.svg';
import xovisEn from '$lib/customers/xovis-en.json';
import xovisDe from '$lib/customers/xovis-de.json';
import xovisLogo from '$lib/images/xovis.svg';
import cometGroupEn from '$lib/customers/comet-group-en.json';
import cometGroupDe from '$lib/customers/comet-group-de.json';
import cometGroupLogo from '$lib/images/comet-group.webp';
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
		case 'xovis':
			return {
				customer: {
					en: xovisEn,
					de: xovisDe,
					logo: xovisLogo
				}
			};
		case 'comet-group':
			return {
				customer: {
					en: cometGroupEn,
					de: cometGroupDe,
					logo: cometGroupLogo
				}
			};
	}

	throw error(404, 'Not found');
};
