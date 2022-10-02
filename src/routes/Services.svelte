<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Fa from 'svelte-fa';
	import {
		faClipboardList,
		faRecycle,
		faPencilAlt,
		faBox,
		faRocket,
		faUndo
	} from '@fortawesome/free-solid-svg-icons';
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import {
		Timeline,
		TimelineItem,
		TimelineSeparator,
		TimelineDot,
		TimelineConnector,
		TimelineContent
	} from 'svelte-vertical-timeline';

	interface Service {
		tag: string;
		icon: IconDefinition;
	}

	const services: Service[] = [
		{ tag: 'assess', icon: faClipboardList },
		{ tag: 'transform', icon: faRecycle },
		{ tag: 'design', icon: faPencilAlt },
		{ tag: 'build', icon: faBox },
		{ tag: 'run', icon: faRocket },
		{ tag: 'rethink', icon: faUndo }
	];
</script>

<section id="services" class="section">
	<div class="columns is-centered columns-section">
		<div class="column is-half">
			<h3 class="title is-2 is-spaced">{$_('services.title')}</h3>
			<p>{$_('services.body')}</p>
			<div class="content team-content">
				<Timeline position="alternate">
					{#each services as service (service.tag)}
						<TimelineItem>
							<TimelineSeparator>
								<TimelineConnector />
								<TimelineDot
									style="width:50px;height:50px;border:none;display: flex; align-items: center;justify-content: center; background-color:#3273dc;color:white;"
									><Fa icon={service.icon} size="lg" /></TimelineDot
								>
							</TimelineSeparator>
							<TimelineContent>
								<h3>{$_(`services.timeline.${service.tag}.title`)}</h3>
								<p>{$_(`services.timeline.${service.tag}.body`)}</p>
							</TimelineContent>
						</TimelineItem>
					{/each}
				</Timeline>
			</div>
		</div>
	</div>
</section>
