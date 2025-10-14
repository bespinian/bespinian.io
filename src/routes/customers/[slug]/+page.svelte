<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';
	import { resolve } from '$app/paths';
	import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';
	import type { Customer } from '$lib/customers/Customer.js';

	let { data } = $props();

	let showNav = $state(false);

	function toggleNav() {
		showNav = !showNav;
	}

	let customer: Customer = $derived($locale?.includes('de-') ? data.customer.de : data.customer.en);
	let logo = $derived($locale?.includes('de-') ? data.customer.logoDe : data.customer.logoEn);
</script>

<svelte:head>
	<title>bespinian - Customer {customer.name}</title>
	<meta name="description" content="bespinian's success story with our customer {customer.name}" />
</svelte:head>

<nav class="navbar is-link is-fixed-top" aria-label="main-navigation">
	<div class="navbar-brand">
		<button
			class="navbar-burger burger"
			class:is-active={showNav}
			aria-label="menu"
			aria-expanded="false"
			data-target="navbar-menu"
			onclick={toggleNav}
		>
			<span aria-hidden="true"></span> <span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</button>
	</div>
	<div id="navbar-menu" class="navbar-menu" class:is-active={showNav}>
		<div class="navbar-end">
			<a href={resolve('/')} class="navbar-item">Home</a>
			<LanguageSwitcher />
		</div>
	</div>
</nav>

<br />
<br />
<section class="section customer-story">
	{#if customer}
		<div class="columns is-centered columns-section">
			<div class="column is-two-thirds is-half-widescreen">
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
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>{@html customer.customer}</p>
				<br />
				<h3 class="title is-3">{$_('customer_story.background')}</h3>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>{@html customer.background}</p>
				<br />
				<h3 class="title is-3">{$_('customer_story.goal')}</h3>
				<p>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html customer.goal}
				</p>
				{#if customer.goalItems}
					<ul>
						{#each customer.goalItems as goal (goal)}
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<li>{@html goal}</li>
						{/each}
					</ul>
				{/if}
				<br />
				<h3 class="title is-3">{$_('customer_story.contribution')}</h3>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>{@html customer.contribution.intro}</p>
				<br />
				{#each customer.contribution.topics as topic (topic.title)}
					<div>
						<h4 class="title is-4">{topic.title}</h4>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
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
