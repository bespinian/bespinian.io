<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';
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

	export let en: Customer;
	export let de: Customer;
	export let logo: string;

	let showNav = false;

	function toggleNav() {
		showNav = !showNav;
	}

	$: customer = $locale?.includes('de-') ? de : en;
</script>

<nav class="navbar is-link is-fixed-top" aria-label="main-navigation">
	<div class="navbar-brand">
		<button
			class="navbar-burger burger"
			class:is-active={showNav}
			aria-label="menu"
			aria-expanded="false"
			data-target="navbar-menu"
			on:click={toggleNav}
		>
			<span aria-hidden="true" /> <span aria-hidden="true" />
			<span aria-hidden="true" />
		</button>
	</div>
	<div id="navbar-menu" class="navbar-menu" class:is-active={showNav} on:click={toggleNav}>
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
