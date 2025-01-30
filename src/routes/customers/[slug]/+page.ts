import { error } from '@sveltejs/kit';
import twentyMinDe from '$lib/customers/20minuten-de.json';
import twentyMinEn from '$lib/customers/20minuten-en.json';
import twentyMinLogo from '$lib/images/20-minuten.svg';
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
import swisscomHealthDe from '$lib/customers/swisscomhealth-de.json';
import swisscomHealthEn from '$lib/customers/swisscomhealth-en.json';
import swisscomLogo from '$lib/images/swisscom.webp';
import meteoswissDe from '$lib/customers/meteoswiss-de.json';
import meteoswissEn from '$lib/customers/meteoswiss-en.json';
import meteoswissLogoDe from '$lib/images/meteoswiss-de.webp';
import meteoswissLogoEn from '$lib/images/meteoswiss-en.webp';

import type { PageLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => [
	{ slug: '20-minuten' },
	{ slug: 'citech-sensors' },
	{ slug: 'swisssign-group' },
	{ slug: 'xovis' },
	{ slug: 'comet-group' },
	{ slug: 'swisscom' },
	{ slug: 'meteoswiss' }
];

export const load: PageLoad = ({ params }) => {
	switch (params.slug) {
		case '20-minuten':
			return {
				customer: {
					en: twentyMinEn,
					de: twentyMinDe,
					logoDe: twentyMinLogo,
					logoEn: twentyMinLogo
				}
			};
		case 'citech-sensors':
			return {
				customer: {
					en: citechEn,
					de: citechDe,
					logoDe: citechLogo,
					logoEn: citechLogo
				}
			};
		case 'swisssign-group':
			return {
				customer: {
					en: swisssignEn,
					de: swisssignDe,
					logoDe: swisssignLogo,
					logoEn: swisssignLogo
				}
			};
		case 'xovis':
			return {
				customer: {
					en: xovisEn,
					de: xovisDe,
					logoDe: xovisLogo,
					logoEn: xovisLogo
				}
			};
		case 'swisscom':
			return {
				customer: {
					en: swisscomHealthEn,
					de: swisscomHealthDe,
					logoDe: swisscomLogo,
					logoEn: swisscomLogo
				}
			};
		case 'comet-group':
			return {
				customer: {
					en: cometGroupEn,
					de: cometGroupDe,
					logoDe: cometGroupLogo,
					logoEn: cometGroupLogo
				}
			};
		case 'meteoswiss':
			return {
				customer: {
					en: meteoswissEn,
					de: meteoswissDe,
					logoDe: meteoswissLogoDe,
					logoEn: meteoswissLogoEn
				}
			};
		default:
			throw error(404, `Customer ${params.slug} not found`);
	}
};
