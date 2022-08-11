<script lang="ts">
	import en from '$lib/customers/citechsensors-en.json';
	import de from '$lib/customers/citechsensors-de.json';
	import logo from '$lib/assets/citechsensors-wide.webp';
	import Customer from '$lib/customers/Customer.svelte';
</script>

<Customer {en} {de} {logo} />
