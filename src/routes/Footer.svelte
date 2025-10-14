<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { resolve } from '$app/paths';

	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="content">
		<div class="columns">
			<div class="column"></div>
			<div class="column has-text-centered">
				<p><strong>bespinian</strong> {year}</p>
			</div>
			<div class="column has-text-right">
				<a href={resolve('/imprint')} class="is-right">{$_('imprint.title')}</a>
			</div>
		</div>
	</div>
</footer>
