<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ga } from '@beyonk/svelte-google-analytics';
	import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';

	let showNav = false;

	function toggleNav() {
		showNav = !showNav;
	}

	function handleClick(section: string) {
		ga.addEvent('navigate', {
			section
		});
	}
</script>

<nav class="navbar is-link is-fixed-top" aria-label="main-navigation">
	<div class="navbar-brand">
		<button
			aria-label="menu"
			aria-expanded="false"
			data-target="navbar-menu"
			class="navbar-burger burger"
			class:is-active={showNav}
			on:click={toggleNav}
		>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</button>
	</div>
	<div id="navbar-menu" class="navbar-menu" class:is-active={showNav} on:click={toggleNav}>
		<div class="navbar-end">
			<a
				href="#mission"
				class="navbar-item"
				on:click={() => {
					handleClick('mission');
				}}
			>
				{$_('mission.nav_item')}
			</a>
			<a
				href="#services"
				class="navbar-item"
				on:click={() => {
					handleClick('services');
				}}
			>
				{$_('services.nav_item')}
			</a>
			<a
				href="#tech"
				class="navbar-item"
				on:click={() => {
					handleClick('tech');
				}}
			>
				{$_('technologies.nav_item')}
			</a>
			<a
				href="#partners"
				class="navbar-item"
				on:click={() => {
					handleClick('partners');
				}}
			>
				{$_('partners.nav_item')}
			</a>
			<a
				href="#customers"
				class="navbar-item"
				on:click={() => {
					handleClick('customers');
				}}
			>
				{$_('customers.nav_item')}
			</a>
			<a
				href="#team"
				class="navbar-item"
				on:click={() => {
					handleClick('team');
				}}
			>
				{$_('team.nav_item')}
			</a>
			<a
				href="https://blog.bespinian.io"
				target="_blank"
				rel="noopener noreferrer"
				class="navbar-item"
				on:click={() => {
					handleClick('blog');
				}}
			>
				{$_('blog.nav_item')}
			</a>
			<a
				href="/jobs"
				class="navbar-item"
				on:click={() => {
					handleClick('jobs');
				}}
			>
				{$_('jobs.nav_item')}
			</a>
			<a
				href="#contact"
				class="navbar-item"
				on:click={() => {
					handleClick('contact');
				}}
			>
				{$_('contact.nav_item')}
			</a>
			<LanguageSwitcher />
		</div>
	</div>
</nav>

<style>
	.navbar-item {
		padding-right: 1.5rem !important;
		padding-left: 1.5rem !important;
	}
</style>
