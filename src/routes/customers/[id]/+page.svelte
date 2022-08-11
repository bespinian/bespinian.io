<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import ciTechSensorsDe from '$lib/customers/citechsensors-de.json';
	import ciTechSensorsEn from '$lib/customers/citechsensors-en.json';
	import swissSignGroupDe from '$lib/customers/swisssigngroup-de.json';
	import swissSignGroupEn from '$lib/customers/swisssigngroup-en.json';
	import logoCiTechSensors from '$lib/assets/citechsensors-wide.webp';
	import logoSwissSignGroup from '$lib/assets/swisssigngroup.svg';
	import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';

	interface Customer {
		name: string;
		title: string;
		customer: string;
		background: string;
		goal: string;
		contribution: {
			intro: string;
			topics: {
				title: string;
				body: string;
			}[];
		};
		technologies: string[];
		quote: {
			stakeholder: {
				name: string;
				role: string;
			};
			body: string;
		};
	}

	const logos: Record<string, string> = {
		citechsensors: logoCiTechSensors,
		swisssigngroup: logoSwissSignGroup
	};

	const customers: Record<string, Customer> = {
		'citechsensors-de-DE': ciTechSensorsDe,
		'citechsensors-de-CH': ciTechSensorsDe,
		'citechsensors-en-US': ciTechSensorsEn,
		'swisssigngroup-de-DE': swissSignGroupDe,
		'swisssigngroup-de-CH': swissSignGroupDe,
		'swisssigngroup-en-US': swissSignGroupEn
	};

	let showNav = false;

	function toggleNav() {
		showNav = !showNav;
	}

	$: logo = logos[`${$page.params.id}`];
	$: customer = customers[`${$page.params.id}-${$locale}`];
</script>

<nav class="navbar is-link is-fixed-top" aria-label="main-navigation">
	<div class="navbar-brand">
		<button
			class={`navbar-burger burger ${showNav ? ' is-active' : ''}`}
			aria-label="menu"
			aria-expanded="false"
			data-target="navbar-menu"
			on:click={toggleNav}
		>
			<span aria-hidden="true" /> <span aria-hidden="true" />
			<span aria-hidden="true" />
		</button>
	</div>
	<div id="navbar-menu" class={`navbar-menu ${showNav ? 'is-active' : ''}`} on:click={toggleNav}>
		<div class="navbar-end">
			<a href="/" class="navbar-item">Home</a>
			<LanguageSwitcher />
		</div>
	</div>
</nav>

<br />
<br />
<section v-if="customer" class="section customer-story">
	{#if customer}
		<div class="columns is-centered columns-section">
			<div class="column is-half">
				<h2 class="title is-2 is-spaced">
					{customer.title}
				</h2>
				<figure class="image customer-story-logo">
					<img src={logo} alt={customer.name} />
				</figure>
				<br />
				<p>
					<i>"{customer.quote.body}"</i>
				</p>
				<br />
				<p style="float: right">
					{customer.quote.stakeholder.name},
					{customer.quote.stakeholder.role}
				</p>
				<br />
				<br />
				<h3 class="title is-3">{$_('customer_story.customer')}</h3>
				<p>{@html customer.customer}</p>
				<br />
				<h3 class="title is-3">{$_('customer_story.background')}</h3>
				<p>{@html customer.background}</p>
				<br />
				<h3 class="title is-3">{$_('customer_story.goal')}</h3>
				<p>{@html customer.goal}</p>
				<br />
				<h3 class="title is-3">{$_('customer_story.contribution')}</h3>
				<p>{@html customer.contribution.intro}</p>
				<br />
				{#each customer.contribution.topics as topic (topic.title)}
					<div>
						<h4 class="title is-4">{topic.title}</h4>
						<p>{@html topic.body}</p>
						<br />
					</div>
				{/each}
				<h3 class="title is-3">{$_('customer_story.technologies')}</h3>
				<ul>
					{#each customer.technologies as tech (tech)}
						<li>{tech}</li>
					{/each}
				</ul>
				<br />
			</div>
		</div>
	{/if}
</section>

<style>
	.customer-story-logo {
		width: 15rem;
		max-width: 70%;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
	.customer-story ul {
		list-style-type: circle;
		padding-left: 30pt;
	}
</style>
