<script lang="ts">
	import { locale, locales } from 'svelte-i18n';
	import { ga } from '@beyonk/svelte-google-analytics';

	const labels: Record<string, string> = {
		'en-US': 'English',
		'de-DE': 'Deutsch',
		'de-CH': 'Bärndütsch'
	};

	function handleLocaleChange(key: string) {
		locale.set(key);
		ga.addEvent('change_language', {
			lang: key
		});
	}
</script>

<div class="navbar-item has-dropdown is-hoverable">
	<span role="button" class="navbar-link">{$locale ? labels[$locale] : 'Language'}</span>
	<div class="navbar-dropdown">
		{#each $locales as l (l)}
			<a
				href={null}
				role="button"
				class="navbar-item"
				on:click={() => {
					handleLocaleChange(l);
				}}
			>
				{labels[l]}
			</a>
		{/each}
	</div>
</div>

<style>
	.navbar-item.has-dropdown {
		padding-left: 1rem !important;
		padding-right: 0.5rem !important;
	}
</style>
