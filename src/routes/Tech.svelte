<script lang="ts">
	import { onMount, SvelteComponent } from 'svelte';
	import { _ } from 'svelte-i18n';
	import aws from '$lib/images/aws.svg';
	import openShift from '$lib/images/openshift.svg';
	import kubernetes from '$lib/images/kubernetes.svg';
	import azure from '$lib/images/azure.svg';
	import cloudFoundry from '$lib/images/cloudfoundry.svg';
	import technologies from '$lib/images/technologies.svg';

	let Carousel: SvelteComponent;
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});

	interface Tech {
		name: string;
		logo: string;
		link: string;
	}

	const techs: Tech[] = [
		{ name: 'AWS', logo: aws, link: 'https://aws.amazon.com' },
		{ name: 'OpenShift', logo: openShift, link: 'https://www.openshift.com' },
		{ name: 'Kubernetes', logo: kubernetes, link: 'https://kubernetes.io' },
		{ name: 'Azure', logo: azure, link: 'https://azure.microsoft.com' },
		{ name: 'Cloud Foundry', logo: cloudFoundry, link: 'https://www.cloudfoundry.org' }
	];
</script>

<section id="tech" class="section">
	<div class="columns is-centered columns-section">
		<div class="column is-half">
			<h3 class="title is-2 is-spaced">{$_('technologies.title')}</h3>
			<p>
				{$_('technologies.platforms.body.intro')}
				<strong>{$_('technologies.platforms.body.platforms')}</strong>
				{$_('technologies.platforms.body.weAreNativeTo')}:
			</p>
			<br />
			<br />
			<div class="container">
				<svelte:component this={Carousel} particlesToShow={3} autoplay={true} dots={false}>
					{#each techs as tech (tech.name)}
						<div class="has-text-centered">
							<div class="has-image-centered customer-logo">
								<figure class="image">
									<img src={tech.logo} alt={tech.name} />
								</figure>
								<br />
							</div>
							<a href={tech.link} target="_blank" rel="noopener noreferrer">{tech.name}</a>
						</div>
					{/each}
				</svelte:component>
			</div>
			<br />
			<br />
			<p>
				{$_('technologies.tools.body.intro')}
				<strong>{$_('technologies.tools.body.tools')}</strong>:
			</p>
			<br />
			<figure class="image">
				<img src={technologies} alt="Technologies" class="technologies-img" />
			</figure>
		</div>
	</div>
</section>
