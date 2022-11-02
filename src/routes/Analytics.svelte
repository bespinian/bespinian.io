<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { dev } from '$app/environment';
	import { _ } from 'svelte-i18n';
	import '@beyonk/gdpr-cookie-consent-banner/dist/style.css';
	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';
	import GdprBanner from '@beyonk/gdpr-cookie-consent-banner';

	let ga: SvelteComponent;

	function initAnalytics() {
		if (!dev) {
			ga.init();
		}
	}
</script>

<GdprBanner
	cookieName="bespinian_gdpr"
	heading={$_('gdpr.heading')}
	description={$_('gdpr.description')}
	settingsLabel={$_('gdpr.settingsLabel')}
	acceptLabel={$_('gdpr.acceptLabel')}
	closeLabel={$_('gdpr.closeLabel')}
	choices={{
		necessary: null,
		tracking: null,
		analytics: {
			label: 'Analytics cookies',
			description: $_('gdpr.analyticsDescription'),
			value: true
		},
		marketing: null
	}}
	showEditIcon={false}
	on:analytics={initAnalytics}
/>

<GoogleAnalytics bind:this={ga} properties={['G-CC9104T46J']} enabled={false} />
