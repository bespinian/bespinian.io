<script lang="ts">
	import { onMount, SvelteComponent } from 'svelte';
	import { _ } from 'svelte-i18n';
	import swisscom from '$lib/assets/swisscom.webp';
	import txGroup from '$lib/assets/tx-group.webp';
	import ciTechSensors from '$lib/assets/citechsensors.webp';
	import swissSignGroup from '$lib/assets/swisssigngroup.svg';
	import emmi from '$lib/assets/emmi.webp';
	import legalI from '$lib/assets/legal-i.webp';
	import skoor from '$lib/assets/skoor.webp';
	import zeilenwerk from '$lib/assets/zeilenwerk.webp';
	import bfh from '$lib/assets/bfh.webp';
	import kalaidos from '$lib/assets/kalaidos.webp';

	let Carousel: SvelteComponent;
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});

	interface Customer {
		name: string;
		logo: string;
		link: string;
	}

	const customers: Customer[] = [
		{ name: 'Swisscom', logo: swisscom, link: 'https://www.swisscom.com' },
		{ name: 'TX Group', logo: txGroup, link: 'https://tx.group' },
		{ name: 'CI Tech Sensors', logo: ciTechSensors, link: '/customers/citechsensors' },
		{ name: 'SwissSign Group', logo: swissSignGroup, link: '/customers/swisssigngroup' },
		{ name: 'Emmi', logo: emmi, link: 'https://group.emmi.com' },
		{ name: 'legal-i', logo: legalI, link: 'https://legal-i.ch' },
		{ name: 'Skoor', logo: skoor, link: 'https://www.skoor.com' },
		{ name: 'Zeilenwerk', logo: zeilenwerk, link: 'https://zeilenwerk.ch' },
		{ name: 'Berner Fachhochschule', logo: bfh, link: 'https://bfh.ch/' },
		{ name: 'Kalaidos Fachhochschule', logo: kalaidos, link: 'https://kalaidos-fh.ch' }
	];
</script>

<section id="customers" class="section">
	<div class="columns is-centered columns-section">
		<div class="column is-half">
			<h3 class="title is-2 is-spaced">{$_('customers.title')}</h3>
			<p>{$_('customers.body')}:</p>
			<br />
			<div class="container">
				<svelte:component this={Carousel} particlesToShow={3} autoplay={true} dots={false}>
					{#each customers as customer (customer.name)}
						<div class="has-text-centered">
							<div class="has-image-centered customer-logo">
								<figure class="image">
									<img src={customer.logo} alt={customer.name} />
								</figure>
								<br />
							</div>
							<a
								href={customer.link}
								target={customer.link.startsWith('http') ? '_blank' : '_self'}
								rel="noopener noreferrer">{customer.name}</a
							>
						</div>
					{/each}
				</svelte:component>
			</div>
		</div>
	</div>
</section>
