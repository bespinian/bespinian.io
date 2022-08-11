<script lang="ts">
	import { _ } from 'svelte-i18n';
	import cloudCity from '$lib/assets/cloudcity.svg';
</script>

<section class="hero is-link is-fullheight">
	<div class="hero-body">
		<div class="container container-cloud-city">
			<div class="columns">
				<div class="column is-offset-1-desktop column-main-title">
					<h1 class="title is-1 is-spaced">bespinian</h1>
					<h2 class="subtitle is-4">{$_('subtitle')}</h2>
				</div>
				<div class="column is-offset-4-desktop has-text-centered">
					<img class="cloud-city" src={cloudCity} alt="Cloud City" />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.container-cloud-city {
		position: fixed;
		width: 100vw;
	}

	.cloud-city {
		width: 26rem;
		height: 26rem;
		max-width: 50vw;
	}

	.column-main-title {
		padding-top: 7rem;
	}

	@media only screen and (max-width: 456px) {
		.cloud-city {
			margin-top: 5rem;
			width: 100%;
		}
	}
</style>
