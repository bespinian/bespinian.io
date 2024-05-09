<script lang="ts">
	import 'bulma/css/bulma.css';
	import { addMessages, init, getLocaleFromQueryString } from 'svelte-i18n';
	import { dev } from '$app/environment';
	import en from '$lib/locales/en.json';
	import de from '$lib/locales/de.json';
	import ch from '$lib/locales/ch.json';
	import Navigation from './Navigation.svelte';
	import Footer from './Footer.svelte';
	import Analytics from './Analytics.svelte';
	import './styles.css';

	addMessages('en-US', en);
	addMessages('de-DE', de);
	addMessages('de-CH', ch);

	init({
		fallbackLocale: 'en-US',
		initialLocale: getLocaleFromQueryString('lang')
	});
</script>

<div class="app">
	<Navigation />

	<main>
		<slot />
	</main>

	<Footer />
</div>

{#if !dev}
	<Analytics />
{/if}
