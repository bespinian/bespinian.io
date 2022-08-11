<script lang="ts">
	import en from '$lib/customers/swisssigngroup-en.json';
	import de from '$lib/customers/swisssigngroup-de.json';
	import logo from '$lib/assets/swisssigngroup.svg';
	import Customer from '$lib/customers/Customer.svelte';
</script>

<Customer {en} {de} {logo} />
