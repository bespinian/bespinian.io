<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Fa from 'svelte-fa';
	import { faUser, faEnvelope, faInfo } from '@fortawesome/free-solid-svg-icons';
</script>

<section id="contact" class="section">
	<div class="columns is-centered columns-section">
		<div class="column is-two-thirds is-half-widescreen">
			<h3 class="title is-2 is-spaced">{$_('contact.title')}</h3>
			<p>{$_('contact.body')}</p>
			<form
				class="content contact-form"
				action="https://formspree.io/contact@bespinian.io"
				method="POST"
			>
				<div class="field">
					<div class="control has-icons-left">
						<input
							class="input"
							name="name"
							placeholder={$_('contact.form.nameplaceholder')}
							aria-label={$_('contact.form.nameplaceholder')}
						/>
						<span class="icon is-small is-left">
							<Fa icon={faUser} />
						</span>
					</div>
				</div>
				<div class="field">
					<div class="control has-icons-left">
						<input
							class="input"
							type="email"
							name="email"
							placeholder={$_('contact.form.emailplaceholder')}
							aria-label={$_('contact.form.emailplaceholder')}
						/>
						<span class="icon is-small is-left">
							<Fa icon={faEnvelope} />
						</span>
					</div>
				</div>
				<div class="field">
					<div class="control has-icons-left">
						<input
							class="input"
							name="subject"
							placeholder={$_('contact.form.subjectplaceholder')}
							aria-label={$_('contact.form.subjectplaceholder')}
						/>
						<span class="icon is-small is-left">
							<Fa icon={faInfo} />
						</span>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<textarea
							class="textarea"
							name="message"
							placeholder={$_('contact.form.messageplaceholder')}
							aria-label={$_('contact.form.messageplaceholder')}
							rows="8"
						/>
					</div>
				</div>
				<div class="field">
					<input
						type="submit"
						class="button is-link is-fullwidth"
						value={$_('contact.form.sendbuttonlabel')}
					/>
				</div>
			</form>
		</div>
	</div>
</section>

<style>
	.contact-form {
		margin-top: 4rem;
	}
</style>
