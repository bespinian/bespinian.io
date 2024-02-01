<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Fa from 'svelte-fa';
	import { faRssSquare } from '@fortawesome/free-solid-svg-icons';
	import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import mathis from '$lib/images/team/mathis.webp';
	import lena from '$lib/images/team/lena.webp';
	import paulina from '$lib/images/team/paulina.webp';
	import john from '$lib/images/team/john.webp';
	import denis from '$lib/images/team/denis.webp';
	import qasim from '$lib/images/team/qasim.webp';
	import philippe from '$lib/images/team/philippe.webp';
	import joel from '$lib/images/team/joel.webp';
	import matthias from '$lib/images/team/matthias.webp';
	import sandra from '$lib/images/team/sandra.webp';
	import rika from '$lib/images/team/rika.webp';
	import rafael from '$lib/images/team/rafael.webp';

	interface Member {
		tag: string;
		name: string;
		portrait: string;
		twitter?: string;
		gitHub?: string;
		linkedIn?: string;
	}

	const members: Member[] = [
		{
			tag: 'mathis',
			name: 'Mathis Kretz',
			portrait: mathis,
			twitter: 'mathis_kretz',
			gitHub: 'mkretz',
			linkedIn: 'mathiskretz'
		},
		{
			tag: 'lena',
			name: 'Lena Fuhrimann',
			portrait: lena,
			gitHub: 'cloudlena',
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
			gitHub: 'cldmstr',
			linkedIn: 'john-m-hutchison'
		},
		{
			tag: 'denis',
			name: 'Denis Kovachevich',
			portrait: denis,
			gitHub: 'denis019',
			linkedIn: 'denis-dev'
		},
		{
			tag: 'qasim',
			name: 'Qasim Warraich',
			portrait: qasim,
			gitHub: 'qasimwarraich',
			linkedIn: 'qasimwarraich'
		},
		{
			tag: 'philippe',
			name: 'Philippe Hässig',
			portrait: philippe,
			gitHub: 'neckhair',
			linkedIn: 'philippehaessig'
		},
		{
			tag: 'joel',
			name: 'Joel Graf',
			portrait: joel,
			gitHub: 'zhews',
			linkedIn: 'workwithjoel'
		},
		{
			tag: 'matthias',
			name: 'Matthias Osswald',
			portrait: matthias,
			gitHub: 'busykoala',
			linkedIn: 'matthias-osswald'
		},
		{
			tag: 'sandra',
			name: 'Sandra Hochstein',
			portrait: sandra,
			linkedIn: 'sandra-hochstein-873229179'
		},
		{
			tag: 'rafael',
			name: 'Rafael Wicht',
			portrait: rafael,
			gitHub: 'rafiwicht',
			linkedIn: 'rafael-wicht-3a95b0166'
		},
		{
			tag: 'rika',
			name: 'Rika',
			portrait: rika
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
											<img
												class="is-rounded"
												src={member.portrait}
												alt={member.name}
												width="128"
												height="128"
											/>
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
												href="https://twitter.com/{member.twitter}"
												target="_blank"
												rel="noopener noreferrer"
												aria-label="{member.name} Twitter"
											>
												<span class="icon"><Fa icon={faTwitter} /></span>
											</a>
										{/if}
										{#if member.gitHub}
											<a
												class="card-footer-item"
												href="https://github.com/{member.gitHub}"
												target="_blank"
												rel="noopener noreferrer"
												aria-label="{member.name} GitHub"
											>
												<span class="icon"><Fa icon={faGithub} /></span>
											</a>
										{/if}
										{#if member.linkedIn}
											<a
												class="card-footer-item"
												href="https://www.linkedin.com/in/{member.linkedIn}/"
												target="_blank"
												rel="noopener noreferrer"
												aria-label="{member.name} LinkedIn"
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
