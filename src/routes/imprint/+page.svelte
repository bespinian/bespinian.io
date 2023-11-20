<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>bespinian - {$_('imprint.title')}</title>
	<meta name="description" content="bespinian is always looking for talent" />
</svelte:head>

<br />
<br />
<section class="section" style="min-height:100vh">
	<h1 class="title is-1">{$_('imprint.title')}</h1>

	<br />
	<br />

	<h2 class="title is-2">{$_('imprint.contact')}</h2>
	<p>
		Email: <a href="mailto:info@bespinian.io">info@bespinian.io</a>
	</p>

	<br />
	<br />

	<h2 class="title is-2">{$_('imprint.headquarters')}</h2>
	<p>
		bespinian GmbH<br />
		Sonnenweg 9<br />
		3073 Gümligen<br />
		{$_('imprint.switzerland')}
	</p>

	<br />
	<br />

	<h2 class="title is-2">{$_('imprint.bernOffice')}</h2>
	<p>
		bespinian GmbH<br />
		Kramgasse 68<br />
		3011 Bern<br />
		{$_('imprint.switzerland')}
	</p>
</section>
