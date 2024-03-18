<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import swisscom from '$lib/images/swisscom.webp';
	import txGroup from '$lib/images/tx-group.webp';
	import twentyMins from '$lib/images/20-minuten.svg';
	import ciTechSensors from '$lib/images/citechsensors.webp';
	import cometGroup from '$lib/images/comet-group.webp';
	import swissSignGroup from '$lib/images/swisssigngroup.svg';
	import emmi from '$lib/images/emmi.webp';
	import legalI from '$lib/images/legal-i.webp';
	import skoor from '$lib/images/skoor.webp';
	import zeilenwerk from '$lib/images/zeilenwerk.svg';
	import bfh from '$lib/images/bfh.webp';
	import kalaidos from '$lib/images/kalaidos.webp';
	import xovis from '$lib/images/xovis.svg';
	import stge from '$lib/images/stahl-gerlafingen.png';

	interface Customer {
		name: string;
		logo: string;
		link: string;
	}

	const customers: Customer[] = [
		{ name: 'Swisscom', logo: swisscom, link: 'https://www.swisscom.com' },
		{ name: 'Xovis', logo: xovis, link: '/customers/xovis' },
		{ name: 'TX Group', logo: txGroup, link: 'https://tx.group' },
		{ name: '20 Minuten', logo: twentyMins, link: '/customers/20-minuten' },
		{ name: 'CI Tech Sensors', logo: ciTechSensors, link: '/customers/citech-sensors' },
		{ name: 'Comet Group', logo: cometGroup, link: '/customers/comet-group' },
		{ name: 'SwissSign Group', logo: swissSignGroup, link: '/customers/swisssign-group' },
		{ name: 'Emmi', logo: emmi, link: 'https://group.emmi.com' },
		{ name: 'legal-i', logo: legalI, link: 'https://legal-i.ch' },
		{ name: 'Skoor', logo: skoor, link: 'https://www.skoor.com' },
		{ name: 'Zeilenwerk', logo: zeilenwerk, link: 'https://zeilenwerk.ch' },
		{ name: 'Berner Fachhochschule', logo: bfh, link: 'https://bfh.ch/' },
		{ name: 'Kalaidos Fachhochschule', logo: kalaidos, link: 'https://kalaidos-fh.ch' },
		{ name: 'Stahl Gerlafingen', logo: stge, link: '/customers/stahl-gerlafingen' }
	];
</script>

<section id="customers" class="section">
	<div class="columns is-centered columns-section">
		<div class="column is-half">
			<h3 class="title is-2 is-spaced">{$_('customers.title')}</h3>
			<p>{$_('customers.body')}:</p>
			<br />
			<div class="container">
				{#if browser}
					<Carousel particlesToShow={3} autoplay={true} dots={false}>
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
					</Carousel>
				{/if}
			</div>
		</div>
	</div>
</section>
