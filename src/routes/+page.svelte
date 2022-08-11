<script lang="ts">
	import Hero from '$lib/Hero.svelte';
	import Mission from '$lib/Mission.svelte';
	import Services from '$lib/Services.svelte';
	import Tech from '$lib/Tech.svelte';
	import Partners from '$lib/Partners.svelte';
	import Customers from '$lib/Customers.svelte';
	import Team from '$lib/Team.svelte';
	import Contact from '$lib/Contact.svelte';
</script>

<svelte:head>
	<title>bespinian - Cloud Native Citizens</title>
	<meta
		name="description"
		content="Homebespinian offers cloud native consulting based on a wide range of technologies and platforms like Docker, Kubernetes or AWS."
	/>
</svelte:head>

<Hero />

<Mission />

<Services />

<Tech />

<Partners />

<Customers />

<Team />

<Contact />
