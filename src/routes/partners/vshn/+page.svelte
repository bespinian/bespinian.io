<script lang="ts">
	import { disableScrollHandling } from '$app/navigation';
	import { _ } from 'svelte-i18n';

	let showNav = $state(false);

	function toggleNav() {
		showNav = !showNav;
	}
</script>

<svelte:head>
	<title>VSHN & bespinian</title>
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
			onclick={toggleNav}
		>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
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
			<style>
				.separateline {
					border-top: 1px solid #000; /* SCHWARZE LINIE */
					margin: 1rem 0; /* Abstand oberhalb und unterhalb */
				}
			</style>
			<div>
				<h3 class="title is-2 is-spaced">VSHN APPUiO & bespinian: deine Cloud-native Journey</h3>
				<br />
				<h4 class="title is-4">Ggf. persönliches Bild von euch &#128522;</h4>
				<br />
			</div>
			<div class="separateline"></div>
			<style>
				.separateline {
					border-top: 1px solid #000; /* SCHWARZE LINIE */
					margin: 1rem 0; /* Abstand oberhalb und unterhalb */
				}
			</style>
			<div>
				<ul>
					<li>
						<strong
							>“Zukunftssichere Plattform trifft strategische Exzellenz: Wir liefern
							massgeschneiderte, skalierbare Cloud-native-Lösungen für deinen nachhaltigen Erfolg.“
						</strong>
					</li>
				</ul>
				<div class="separateline"></div>
				<p>
					Keine Kapazität? Kein Problem! Wir unterstützen dich bei deinem Anliegen von der
					Bedarfsanalyse bis zum 24/7 Support.
				</p>
				<br />
				<p>In nur wenigen Schritten zum Erfolg! Deine Journey mit uns:</p>
				<br />
				<h4 class="title is-4">Merci im Voraus für die Erstellung der Grafik &hearts;</h4>
				<style>
					/* Nur für Listen mit der Klasse .custom-list */
					.custom-list {
						list-style-type: disc; /*
            Bulletpoints */
						padding-left: 20px; /*
            Einrückung der Liste */
					}
					.custom-list li {
						margin-bottom: 0.5rem; /*
            Abstand zwischen den Einträgen */
					}
					.custom-list li strong {
						font-weight: bold; /*
            Fettgedruckter Text */
					}
				</style>
				<ul class="custom-list">
					<li>
						<strong>Vision entdecken:</strong> Wir verstehen deine Herausforderungen und entwickeln eine
						massgeschneiderte Strategie.
					</li>
				</ul>
				<ul class="custom-list">
					<li>
						<strong>Lösungen entwickeln:</strong> Wir setzen deine Lösung professionell um und schulen
						dich und dein Team.
					</li>
				</ul>
				<ul class="custom-list">
					<li>
						<strong>Erfolg realisieren:</strong> Wir betreiben deine Plattform zuverlässig und entwickeln
						sie kontinuierlich weiter.
					</li>
				</ul>
				<p>
					Mit uns hast du einen starken Partner an deiner Seite, der dich in jeder Phase individuell
					begleitet und supportet - bist du für deine erfolgreiche Cloud-native Zukunft bereit?
				</p>
				<br />
				<h4 class="title is-4">Warum VSHN und bespinian?</h4>
				<p>
					Wir vereinen unsere Stärken, um deine Cloud-native Transformation effizient, sicher und
					nachhaltig zu gestalten. Gemeinsam sind wir dein verlässlicher Partner für innovative
					Cloud-native Lösungen, optimierte Prozesse und langfristigen Erfolg.
				</p>
				<br />
				<ul>
					<li><strong>Unsere Zusammenarbeit – Deine Vorteile </strong></li>
				</ul>
				<br />
				<p>1. Synergie aus Betrieb und Strategie</p>
				<br />
				<p>
					VSHN: Spezialist:in für Betrieb und kontinuierlichen Support deiner Plattform. Wir stellen
					sicher, dass deine Systeme stabil, sicher und rund um die Uhr verfügbar sind.
				</p>
				<br />
				<p>
					bespinian: Expert:in für Strategie und Architektur. Wir entwickeln individuelle
					Cloud-native Lösungen, perfekt abgestimmt auf deine Bedürfnisse.
				</p>
				<br />
				<p>
					Ergebnis: Du profitierst von einem nahtlosen Übergang von Planung zu Betrieb, ohne
					Reibungsverluste.
				</p>
				<br />

				<p>2. Tiefes technisches Know-how</p>
				<br />
				<p>
					VSHN bringt umfangreiche Erfahrung in DevOps, CI/CD-Infrastruktur und Plattformbetrieb
					mit. bespinian ergänzt dies durch exzellentes Wissen in Cloud-Strategie, Architekturdesign
					und Migration.
				</p>
				<br />
				<p>Gemeinsam schaffen wir:</p>
				<br />
				<style>
					/* Nur für Listen mit der Klasse .custom-list */
					.custom-list {
						list-style-type: disc; /*
                Bulletpoints */
					}
				</style>

				<ul class="custom-list">
					<li>Effiziente Automatisierung deiner Prozesse</li>
				</ul>

				<ul class="custom-list">
					<li>Massgeschneiderte Plattformlösungen</li>
				</ul>
				<ul class="custom-list">
					<li>Höchste Sicherheits- und Skalierbarkeitsstandards</li>
				</ul>
				<br />
				<p>3. Eine Partnerschaft auf Augenhöhe</p>
				<br />
				<p>
					Mit VSHN und bespinian hast du nicht nur Anbieter:innen, sondern Partner:innen, die sich
					deinem Ziel annehmen. Wir setzen auf eine enge Zusammenarbeit, klare Kommunikation und
					massgeschneiderte Lösungen, die echten Mehrwert bieten.
				</p>
				<br />
				<h4 class="title is-4">Warum APPUiO?</h4>
				<p>
					APPUiO - die Plattform für Unternehmen, die Lösungen für Managed Kubernetes- und
					OpenShift-Services bietet. Mit unserem Platform-as-a-Service (PaaS)-Angebot und durch die
					Integration von DevOps-Prinzipien erleichtern wir den gesamten Entwicklungsprozess und
					steigern die Agilität deines Unternehmens. Reagiere flexibel und schnell auf
					Marktveränderungen - mit der Unterstützung von APPUiO.
				</p>
				<br />
				<p>Was APPUiO bietet:</p>
				<br />
				<ul>
					<li><strong>Flexibilität: </strong></li>
				</ul>
				<p>Cloud-native Anwendungen, die zu deinem Unternehmen passen.</p>
				<br />
				<ul>
					<li><strong>Skalierbarkeit: </strong></li>
				</ul>
				<p>Wachse ohne Grenzen.</p>
				<br />
				<ul>
					<li><strong>Sicherheit: </strong></li>
				</ul>
				<p>Ein Betrieb, der höchsten Standards entspricht.</p>
				<br />
				<ul>
					<li><strong>Effizienz: </strong></li>
				</ul>
				<p>Automatisierte Prozesse, die dich und dein Team entlasten.</p>
				<br />
			</div>
		</div>
	</div>
</section>
