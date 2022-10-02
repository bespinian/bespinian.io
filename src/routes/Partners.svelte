<script lang="ts">
	import { onMount, SvelteComponent } from 'svelte';
	import { _ } from 'svelte-i18n';
	import acend from '$lib/images/acend.webp';
	import swisscom from '$lib/images/swisscom.webp';
	import vshn from '$lib/images/vshn.svg';
	import aws from '$lib/images/aws.webp';
	import puzzle from '$lib/images/puzzle.webp';
	import redHat from '$lib/images/redhat.webp';
	import swissMadeSoftware from '$lib/images/swissmadesoftware.webp';

	let Carousel: SvelteComponent;
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});

	interface Partner {
		name: string;
		logo: string;
		link: string;
	}

	const partners: Partner[] = [
		{ name: 'acend', logo: acend, link: 'https://acend.ch' },
		{ name: 'Swisscom', logo: swisscom, link: 'https://www.swisscom.com' },
		{ name: 'VSHN', logo: vshn, link: 'https://vshn.ch' },
		{ name: 'AWS Partner Network', logo: aws, link: 'https://aws.amazon.com/partners/' },
		{ name: 'Puzzle ITC', logo: puzzle, link: 'https://puzzle.ch' },
		{ name: 'Red Hat', logo: redHat, link: 'https://redhat.com' },
		{ name: 'Swiss Made Software', logo: swissMadeSoftware, link: 'https://swissmadesoftware.org' }
	];
</script>

<section id="partners" class="section">
	<div class="columns is-centered columns-section">
		<div class="column is-half">
			<h3 class="title is-2 is-spaced">{$_('partners.title')}</h3>
			<p>{$_('partners.body')}:</p>
			<br />
			<div class="container">
				<svelte:component this={Carousel} particlesToShow={3} autoplay={true} dots={false}>
					{#each partners as partner (partner.name)}
						<div class="has-text-centered">
							<div class="has-image-centered customer-logo-extra-wide customer-logo-extra-slim">
								<figure class="image">
									<img src={partner.logo} alt={partner.name} />
								</figure>
								<br />
							</div>
							<a href={partner.link} target="_blank" rel="noopener noreferrer">{partner.name}</a>
						</div>
					{/each}
				</svelte:component>
			</div>
		</div>
	</div>
</section>
