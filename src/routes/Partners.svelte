<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import acend from '$lib/images/acend.webp';
	import swisscom from '$lib/images/swisscom.webp';
	import vshn from '$lib/images/vshn.svg';
	import aws from '$lib/images/aws.webp';
	import puzzle from '$lib/images/puzzle.webp';
	import redHat from '$lib/images/redhat.webp';
	import swissMadeSoftware from '$lib/images/swissmadesoftware.webp';
	import peakscale from '$lib/images/peakscale.svg';
	import isovalent from '$lib/images/isovalent.svg';

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
		{ name: 'AWS Partner Network', logo: aws, link: 'https://aws.amazon.com/partners/' },
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
				<Splide options={{ rewind: true, perPage: 3 }} aria-label="ASDa">
					{#each partners as partner (partner.name)}
						<SplideSlide>
							<img src={partner.logo} alt={partner.name} width="120" height="120" />
						</SplideSlide>
					{/each}
				</Splide>
			</div>
		</div>
	</div>
</section>
