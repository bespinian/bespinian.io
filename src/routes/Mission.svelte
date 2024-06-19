<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';

	const solutions = ['operate', 'adaptable', 'scalable', 'optimized'];
</script>

<section id="mission" class="section">
	<div class="columns is-centered columns-section">
		<div class="column is-half">
			<h3 class="title is-2 is-spaced">{$_('mission.title')}</h3>
			<p>{$_('mission.body')}</p>
			<div class="content team-content">
				<div class="columns">
					<div
						class="column is-centered is-10-desktop is-offset-1-desktop is-half-fullhd is-offset-one-quarter-fullhd"
					>
						<div class="box">
							<div class="card-content">
								<p class="title is-4">
									{$_('mission.solutions.title')}
								</p>
								<div class="content">
									{#each solutions as solution (solution)}
										<p class="is-flex">
											<span class="icon has-text-link icon-checkmark">
												<Fa icon={faCheck} />
											</span>
											{$_(`mission.solutions.${solution}`)}
										</p>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.icon-checkmark {
		margin-right: 0.7rem;
	}
</style>
