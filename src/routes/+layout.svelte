<script lang="ts">
	import 'bulma/css/bulma.css';
	import { addMessages, init, getLocaleFromQueryString } from 'svelte-i18n';
	import en from '$lib/locales/en.json';
	import de from '$lib/locales/de.json';
	import ch from '$lib/locales/ch.json';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import Analytics from '$lib/Analytics.svelte';
	import '../app.css';

	addMessages('en-US', en);
	addMessages('de-DE', de);
	addMessages('de-CH', ch);

	init({
		fallbackLocale: 'en-US',
		initialLocale: getLocaleFromQueryString('lang')
	});
</script>

<Navigation />

<main>
	<slot />
</main>

<Footer />

<Analytics />
