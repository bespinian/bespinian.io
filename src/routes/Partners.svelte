<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import acend from '$lib/images/acend.webp';
	import swisscom from '$lib/images/swisscom.webp';
	import vshn from '$lib/images/vshn.svg';
	import aws from '$lib/images/aws.webp';
	import puzzle from '$lib/images/puzzle.webp';
	import spoud from '$lib/images/spoud.svg';
	import redHat from '$lib/images/redhat.webp';
	import swissMadeSoftware from '$lib/images/swissmadesoftware.webp';
	import peakscale from '$lib/images/peakscale.svg';
	import isovalent from '$lib/images/isovalent.svg';
	import rokt from '$lib/images/rokt.svg';
	import begasoft from '$lib/images/begasoft.svg';

	interface Partner {
		name: string;
		logo: string;
		link: string;
	}

	const partners: Partner[] = [
		{ name: 'Peak Scale', logo: peakscale, link: 'https://peakscale.ch' },
		{ name: 'Puzzle ITC', logo: puzzle, link: 'https://puzzle.ch' },
		{ name: 'Isovalent', logo: isovalent, link: 'https://isovalent.com' },
		{ name: 'VSHN', logo: vshn, link: 'https://vshn.ch' },
		{ name: 'acend', logo: acend, link: 'https://acend.ch' },
		{ name: 'Swisscom', logo: swisscom, link: 'https://www.swisscom.com' },
		{ name: 'SPOUD', logo: spoud, link: 'https://www.spoud.io' },
		{ name: 'AWS Partner Network', logo: aws, link: 'https://aws.amazon.com/partners/' },
		{ name: 'Red Hat', logo: redHat, link: 'https://redhat.com' },
		{ name: 'Swiss Made Software', logo: swissMadeSoftware, link: 'https://swissmadesoftware.org' },
		{ name: 'ROKT', logo: rokt, link: 'https://rokt.cloud' },
		{ name: 'BEGASOFT', logo: begasoft, link: 'https://www.begasoft.ch/' }
	];
</script>

<section id="partners" class="section">
	<div class="columns is-centered columns-section">
		<div class="column is-half">
			<h3 class="title is-2 is-spaced">{$_('partners.title')}</h3>
			<p>{$_('partners.body')}:</p>
			<br />
			<div class="container">
				{#if browser}
					<Carousel particlesToShow={3} autoplay={true} dots={false}>
						{#each partners as partner (partner.name)}
							<div class="has-text-centered">
								<div class="has-image-centered customer-logo">
									<figure class="image">
										<img src={partner.logo} alt={partner.name} width="120" height="120" />
									</figure>
									<br />
								</div>
								<a href={partner.link} target="_blank" rel="noopener noreferrer">{partner.name}</a>
							</div>
						{/each}
					</Carousel>
				{/if}
			</div>
		</div>
	</div>
</section>
