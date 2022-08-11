<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Fa from 'svelte-fa';
	import { faRssSquare } from '@fortawesome/free-solid-svg-icons';
	import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import mathis from '$lib/assets/mathis.webp';
	import lena from '$lib/assets/lena.webp';
	import paulina from '$lib/assets/paulina.webp';
	import john from '$lib/assets/john.webp';

	interface Member {
		tag: string;
		name: string;
		portrait: string;
		twitter?: string;
		github?: string;
		linkedIn?: string;
	}

	const members: Member[] = [
		{
			tag: 'mathis',
			name: 'Mathis Kretz',
			portrait: mathis,
			twitter: 'mathis_kretz',
			github: 'mkretz',
			linkedIn: 'mathiskretz'
		},
		{
			tag: 'lena',
			name: 'Lena Fuhrimann',
			portrait: lena,
			twitter: 'the_cloudlena',
			github: 'cloudlena',
			linkedIn: 'lena-fuhrimann'
		},
		{
			tag: 'paulina',
			name: 'Paulina Grochal',
			portrait: paulina,
			linkedIn: 'paulina-grochal'
		},
		{
			tag: 'john',
			name: 'John Hutchison',
			portrait: john,
			github: 'cldmstr',
			linkedIn: 'john-m-hutchison'
		}
	];
</script>

<section id="team" class="section">
	<div class="columns is-centered columns-section">
		<div class="column is-half">
			<h3 class="title is-2 is-spaced">{$_('team.title')}</h3>
			<p>{$_('team.body')}</p>
			<div class="content team-content">
				<!-- Flex wrap is manually required since tiles do not support flex otherwise -->
				<div class="tile is-ancestor" style="flex-wrap: wrap">
					{#each members as member (member.tag)}
						<div class="tile is-parent is-6">
							<article class="tile is-child">
								<div class="card">
									<div class="card-content">
										<figure class="image is-128x128 is-centered">
											<img class="is-rounded" src={member.portrait} alt={member.name} />
										</figure>
										<br />
										<p class="title">
											{member.name}
										</p>
										<p class="subtitle">
											{$_(`team.${member.tag}.catchphrase`)}
										</p>
										<div class="content">{$_(`team.${member.tag}.body`)}</div>
									</div>
									<footer class="card-footer">
										{#if member.twitter}
											<a
												class="card-footer-item"
												href={`https://twitter.com/${member.twitter}`}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`${member.name} Twitter`}
											>
												<span class="icon"><Fa icon={faTwitter} /></span>
											</a>
										{/if}
										{#if member.github}
											<a
												class="card-footer-item"
												href={`https://github.com/${member.github}`}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`${member.name} GitHub`}
											>
												<span class="icon"><Fa icon={faGithub} /></span>
											</a>
										{/if}
										{#if member.linkedIn}
											<a
												class="card-footer-item"
												href={`https://www.linkedin.com/in/${member.linkedIn}/`}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`${member.name} LinkedIn`}
											>
												<span class="icon"><Fa icon={faLinkedin} /></span>
											</a>
										{/if}
										<a
											class="card-footer-item"
											href="https://blog.bespinian.io"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="bespinian Blog"
										>
											<span class="icon"><Fa icon={faRssSquare} /></span>
										</a>
									</footer>
								</div>
							</article>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
