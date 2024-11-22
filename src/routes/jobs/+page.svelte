<script lang="ts">
	import { _ } from 'svelte-i18n';

	let showNav = false;

	function toggleNav() {
		showNav = !showNav;
	}
</script>

<svelte:head>
	<title>bespinian - Jobs</title>
	<meta name="description" content="bespinian is always looking for talent" />
</svelte:head>

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
	<div id="navbar-menu" class="navbar-menu" class:is-active={showNav}>
		<div class="navbar-end">
			<a href="/" class="navbar-item">Home</a>
			<a href="/jobs" class="navbar-item">{$_('jobs.nav_item')}</a>
		</div>
	</div>
</nav>

<br />
<br />
<section class="section">
	<div class="columns is-centered columns-section">
		<div class="column is-two-thirds is-half-widescreen">
			<h3 class="title is-2 is-spaced">Cloud Solutions Engineer 60-100%</h3>
			<p>
				We are looking to extend our team of software engineers and architects. They each advise
				multiple customers holistically on different technologies and architectures in various cloud
				and container environments. If you like to get to know and work with new bleeding edge
				technologies every day and feel at home in public, private and hybrid cloud environments,
				bespinian is the right place for you!
			</p>
			<p>
				We are a very trust-based company that uses <a href="https://www.holacracy.org/"
					>Holacracy</a
				> as a governance model.
			</p>
			<br />
			<br />
			<h4 class="title is-4">Requirements</h4>
			<ul>
				<li>You have practical experience with Kubernetes, Terraform, AWS, Azure, or GCP</li>
				<li>You have worked as a software architect but also as a developing engineer</li>
				<li>You have practical experience with DevOps, CI/CD, and automation</li>
				<li>You like to work with multiple customers and technologies</li>
				<li>
					You are interested in participating in shaping the company and taking responsibility
				</li>
				<li>You are currently located in or are willing to relocate to Switzerland</li>
				<li>You are fluent in German and English</li>
			</ul>
			<br />
			<h4 class="title is-4">Nice to Have</h4>
			<ul>
				<li>You have experience developing full stack applications</li>
				<li>You have experience with microservice architectures</li>
				<li>You have experience with serverless solutions</li>
				<li>You have an existing professional network in the Swiss cloud market</li>
				<li>You speak French</li>
			</ul>
			<br />
			<h4 class="title is-4">Tasks</h4>
			<ul>
				<li>
					You support our customers on engineering in and around container orchestration and the
					cloud
				</li>
				<li>You co-create software architectures with customers</li>
				<li>You help customers implement those architectures in efficient ways</li>
				<li>You train customers' teams in their abilities</li>
				<li>You help our customers feel at home in cloud environments</li>
			</ul>
			<br />
			<h4 class="title is-4">What We Offer</h4>
			<ul>
				<li>Flexible ways of hybrid working and a lot of responsibility</li>
				<li>Collaboration with various companies, industries and technologies</li>
				<li>A fast-paced start-up environment</li>
				<li>A great team of fun people with diverse backgrounds</li>
				<li>A competitive salary and great benefits</li>
				<li>An awesome office in the heart of Bern</li>
				<li>Employment level: 60-100%</li>
				<li>Employment date: Flexible</li>
			</ul>
			<br />
			<br />
			<p>
				Are you interested? We highly value diversity. Drop us a line at
				<a href="mailto:jobs@bespinian.io">jobs@bespinian.io</a> and tell us why you would like to join
				our awesome team of bespinians.
			</p>
			<br />
			<p>PS: We aim to fill this position without the help of recruitment agencies.</p>
		</div>
	</div>
</section>
