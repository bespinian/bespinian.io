<template>
  <div id="home">
    <Navigation />

    <section class="hero is-link is-fullheight">
      <div class="hero-body">
        <div class="container container-cloud-city">
          <div class="columns">
            <div class="column is-offset-1-desktop column-main-title">
              <h1 class="title is-1 is-spaced">
                be<span class="is-blinking">|</span>spinian
              </h1>
              <h2 class="subtitle is-4">{{ $t("subtitle") }}</h2>
            </div>
            <div class="column is-offset-4-desktop has-text-centered">
              <img
                class="cloud-city"
                src="../assets/cloudcity.svg"
                alt="Cloud City"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="mission" class="section">
      <div class="columns is-centered columns-section">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("mission.title") }}</h3>
          <p>{{ $t("mission.body") }}</p>
          <div class="content team-content">
            <div class="columns">
              <div
                class="
                  column
                  is-centered is-half-desktop is-offset-one-quarter-desktop
                "
              >
                <div class="box">
                  <div class="card-content">
                    <p class="title is-4">
                      {{ $t("mission.solutions.title") }}
                    </p>
                    <div class="content">
                      <p>
                        <span class="icon has-text-link icon-checkmark">
                          <font-awesome-icon icon="check" />
                        </span>
                        {{ $t("mission.solutions.operate") }}
                      </p>
                      <p>
                        <span class="icon has-text-link icon-checkmark">
                          <font-awesome-icon icon="check" />
                        </span>
                        {{ $t("mission.solutions.adaptable") }}
                      </p>
                      <p>
                        <span class="icon has-text-link icon-checkmark">
                          <font-awesome-icon icon="check" />
                        </span>
                        {{ $t("mission.solutions.scalable") }}
                      </p>
                      <p>
                        <span class="icon has-text-link icon-checkmark">
                          <font-awesome-icon icon="check" />
                        </span>
                        {{ $t("mission.solutions.optimized") }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="section">
      <div class="columns is-centered columns-section">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("services.title") }}</h3>
          <p>{{ $t("services.body") }}</p>
          <div class="content team-content">
            <div class="timeline is-centered">
              <div class="timeline-item">
                <div class="timeline-marker is-image is-link is-48x48">
                  <font-awesome-icon
                    class="timeline-icon timeline-icon-assess"
                    icon="clipboard-list"
                    size="lg"
                  />
                </div>
                <div class="timeline-content">
                  <p class="heading">
                    {{ $t("services.timeline.assess.title") }}
                  </p>
                  <p>{{ $t("services.timeline.assess.body") }}</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-image is-link is-48x48">
                  <font-awesome-icon
                    class="timeline-icon timeline-icon-transform"
                    icon="recycle"
                    size="lg"
                  />
                </div>
                <div class="timeline-content">
                  <p class="heading">
                    {{ $t("services.timeline.transform.title") }}
                  </p>
                  <p>{{ $t("services.timeline.transform.body") }}</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-image is-link is-48x48">
                  <font-awesome-icon
                    class="timeline-icon timeline-icon-design"
                    icon="pencil-alt"
                    size="lg"
                  />
                </div>
                <div class="timeline-content">
                  <p class="heading">
                    {{ $t("services.timeline.design.title") }}
                  </p>
                  <p>{{ $t("services.timeline.design.body") }}</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-image is-link is-48x48">
                  <font-awesome-icon
                    class="timeline-icon timeline-icon-build"
                    icon="box"
                    size="lg"
                  />
                </div>
                <div class="timeline-content">
                  <p class="heading">
                    {{ $t("services.timeline.build.title") }}
                  </p>
                  <p>{{ $t("services.timeline.build.body") }}</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-image is-link is-48x48">
                  <font-awesome-icon
                    class="timeline-icon timeline-icon-run"
                    icon="rocket"
                    size="lg"
                  />
                </div>
                <div class="timeline-content">
                  <p class="heading">{{ $t("services.timeline.run.title") }}</p>
                  <p>{{ $t("services.timeline.run.body") }}</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-image is-link is-48x48">
                  <font-awesome-icon
                    icon="undo"
                    size="lg"
                    class="timeline-icon timeline-icon-rethink"
                  />
                </div>
                <div class="timeline-content">
                  <p class="heading">
                    {{ $t("services.timeline.rethink.title") }}
                  </p>
                  <p>{{ $t("services.timeline.rethink.body") }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="tech" class="section">
      <div class="columns is-centered columns-section">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("technologies.title") }}</h3>
          <p>
            {{ $t("technologies.platforms.body.intro") }}
            <strong>{{ $t("technologies.platforms.body.platforms") }}</strong>
            {{ $t("technologies.platforms.body.weAreNativeTo") }}:
          </p>
          <br />
          <br />
          <div class="container">
            <carousel
              :per-page-custom="[
                [480, 2],
                [768, 4],
                [1024, 5],
              ]"
              :scroll-per-page="true"
              pagination-active-color="#3273dc"
            >
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/aws.svg" alt="AWS " />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://aws.amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AWS
                </a>
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/openshift.svg" alt="OpenShift" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://www.openshift.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenShift
                </a>
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/kubernetes.svg" alt="Kubernetes" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://kubernetes.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kubernetes
                </a>
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/docker.svg" alt="Docker" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://www.docker.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docker
                </a>
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/cloudfoundry.svg" alt="Cloud Foundry" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://www.cloudfoundry.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cloud Foundry
                </a>
              </slide>
            </carousel>
          </div>
          <br />
          <br />
          <p>
            {{ $t("technologies.tools.body.intro") }}
            <strong>{{ $t("technologies.tools.body.tools") }}</strong
            >:
          </p>
          <br />
          <figure class="image">
            <img
              src="../assets/technologies.svg"
              alt="Technologies"
              class="technologies-img"
            />
          </figure>
        </div>
      </div>
    </section>

    <section id="partners" class="section">
      <div class="columns is-centered columns-section">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("partners.title") }}</h3>
          <p>{{ $t("partners.body") }}:</p>
          <br />
          <br />
          <div class="container">
            <carousel
              :per-page-custom="[
                [480, 2],
                [768, 4],
                [1024, 5],
              ]"
              :scroll-per-page="true"
              pagination-active-color="#3273dc"
            >
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/redhat.webp" alt="Red Hat" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://www.redhat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Red Hat</a
                >
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/swisscom.webp" alt="Swisscom" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://www.swisscom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Swisscom</a
                >
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo-wide">
                  <figure class="image">
                    <img src="../assets/vshn.svg" alt="VSHN" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://vshn.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  >VSHN</a
                >
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/aws.webp" alt="AWS Partner Network" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://aws.amazon.com/partners/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >AWS Partner Network</a
                >
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/puzzle.webp" alt="Puzzle ITC" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://puzzle.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Puzzle ITC</a
                >
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo-extra-wide">
                  <figure class="image">
                    <img
                      src="../assets/swissmadesoftware.webp"
                      alt="swiss made software"
                    />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://www.swissmadesoftware.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  >swiss made software</a
                >
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </section>

    <section id="customers" class="section">
      <div class="columns is-centered columns-section">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("customers.title") }}</h3>
          <p>{{ $t("customers.body") }}:</p>
          <br />
          <br />
          <div class="container">
            <carousel
              :per-page-custom="[
                [480, 2],
                [768, 4],
                [1024, 5],
              ]"
              :scroll-per-page="true"
              pagination-active-color="#3273dc"
            >
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/swisscom.webp" alt="Swisscom" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://www.swisscom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Swisscom</a
                >
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/tx-group.webp" alt="TX Group" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://tx.group"
                  target="_blank"
                  rel="noopener noreferrer"
                  >TX Group</a
                >
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img
                      src="../assets/citechsensors.webp"
                      alt="CI Tech Sensors"
                    />
                  </figure>
                  <br />
                </div>
                <router-link to="/customers/citechsensors">
                  CI Tech Sensors
                </router-link>
              </slide>
              <slide class="has-text-centered">
                <div
                  class="
                    has-image-centered
                    customer-logo-extra-wide customer-logo-slim
                  "
                >
                  <figure class="image">
                    <img src="../assets/emmi.webp" alt="Emmi" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://group.emmi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Emmi</a
                >
              </slide>
              <slide class="has-text-centered">
                <div
                  class="
                    has-image-centered
                    customer-logo-extra-wide customer-logo-extra-slim
                  "
                >
                  <figure class="image">
                    <img src="../assets/legal-i.webp" alt="legal-i" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://legal-i.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >legal-i</a
                >
              </slide>
              <slide class="has-text-centered">
                <div
                  class="
                    has-image-centered
                    customer-logo-extra-wide customer-logo-extra-slim
                  "
                >
                  <figure class="image">
                    <img src="../assets/skoor.webp" alt="Skoor" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://www.skoor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Skoor</a
                >
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/zeilenwerk.webp" alt="Zeilenwerk" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://zeilenwerk.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Zeilenwerk</a
                >
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/bfh.webp" alt="Berner Fachhochschule" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://bfh.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Berner Fachhochschule</a
                >
              </slide>
              <slide class="has-text-centered">
                <div class="has-image-centered customer-logo">
                  <figure class="image">
                    <img src="../assets/kalaidos.webp" alt="Kalaidos" />
                  </figure>
                  <br />
                </div>
                <a
                  href="https://www.kalaidos-fh.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Kalaidos Fachhochschule</a
                >
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </section>

    <section id="team" class="section">
      <div class="columns is-centered columns-section">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("team.title") }}</h3>
          <p>{{ $t("team.body") }}</p>
          <div class="content team-content">
            <!-- Flex wrap is manually required since tiles do not support flex otherwise -->
            <div class="tile is-ancestor" style="flex-wrap: wrap">
              <div class="tile is-parent is-6">
                <article class="tile is-child">
                  <div class="card">
                    <div class="card-content">
                      <figure class="image is-128x128 is-centered">
                        <img
                          class="is-rounded"
                          src="../assets/mathis.webp"
                          alt="Mathis Kretz"
                        />
                      </figure>
                      <br />
                      <p class="title">
                        {{ $t("team.mathis.name") }}
                      </p>
                      <p class="subtitle">
                        {{ $t("team.mathis.catchphrase") }}
                      </p>
                      <div class="content">{{ $t("team.mathis.body") }}</div>
                    </div>
                    <footer class="card-footer">
                      <a
                        class="card-footer-item"
                        href="https://twitter.com/mathis_kretz"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                      >
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'twitter']" />
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://github.com/mkretz"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'github']" />
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://www.linkedin.com/in/mathiskretz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'linkedin']" />
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://www.xing.com/profile/Mathis_Kretz"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Xing"
                      >
                        <font-awesome-icon :icon="['fab', 'xing']" />
                      </a>
                    </footer>
                  </div>
                </article>
              </div>
              <div class="tile is-parent is-6">
                <article class="tile is-child">
                  <div class="card">
                    <div class="card-content">
                      <figure class="image is-128x128">
                        <img
                          class="is-rounded"
                          src="../assets/lena.webp"
                          alt="Lena Fuhrimann"
                        />
                      </figure>
                      <br />
                      <p class="title">
                        {{ $t("team.lena.name") }}
                      </p>
                      <p class="subtitle">
                        {{ $t("team.lena.catchphrase") }}
                      </p>
                      <div class="content">{{ $t("team.lena.body") }}</div>
                    </div>
                    <footer class="card-footer">
                      <a
                        class="card-footer-item"
                        href="https://twitter.com/mastertinner"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                      >
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'twitter']" />
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://github.com/mastertinner"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'github']" />
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://www.linkedin.com/in/lena-fuhrimann/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'linkedin']" />
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://blog.bespinian.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Blog"
                      >
                        <span class="icon">
                          <font-awesome-icon icon="rss-square" />
                        </span>
                      </a>
                    </footer>
                  </div>
                </article>
              </div>
              <div class="tile is-parent is-6">
                <article class="tile is-child">
                  <div class="card">
                    <div class="card-content">
                      <figure class="image is-128x128">
                        <img
                          class="is-rounded"
                          src="../assets/gabriel.webp"
                          alt="Gabriel Koch"
                        />
                      </figure>
                      <br />
                      <p class="title">
                        {{ $t("team.gabriel.name") }}
                      </p>
                      <p class="subtitle">
                        {{ $t("team.gabriel.catchphrase") }}
                      </p>
                      <div class="content">{{ $t("team.gabriel.body") }}</div>
                    </div>
                    <footer class="card-footer">
                      <a
                        class="card-footer-item"
                        href="https://twitter.com/elessar_ch"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                      >
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'twitter']" />
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://github.com/elessar-ch"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'github']" />
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://www.linkedin.com/in/gabriel-koch-ch/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'linkedin']" />
                        </span>
                      </a>
                    </footer>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="section">
      <div class="columns is-centered columns-section">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("contact.title") }}</h3>
          <p>{{ $t("contact.body") }}</p>
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
                  :placeholder="$t('contact.form.nameplaceholder')"
                  aria-label="$t('contact.form.nameplaceholder')"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="user" />
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  class="input"
                  type="email"
                  name="email"
                  :placeholder="$t('contact.form.emailplaceholder')"
                  aria-label="$t('contact.form.emailplaceholder')"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="envelope" />
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  class="input"
                  name="subject"
                  :placeholder="$t('contact.form.subjectplaceholder')"
                  aria-label="$t('contact.form.subjectplaceholder')"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="info" />
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <textarea
                  class="textarea"
                  name="message"
                  :placeholder="$t('contact.form.messageplaceholder')"
                  aria-label="$t('contact.form.messageplaceholder')"
                  rows="8"
                ></textarea>
              </div>
            </div>
            <div class="field">
              <input
                type="submit"
                class="button is-link is-fullwidth"
                :value="$t('contact.form.sendbuttonlabel')"
              />
            </div>
          </form>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="content has-text-centered">
        <p><strong>bespinian</strong> {{ new Date().getFullYear() }}</p>
        <cookie-law
          :message="$t('cookie_consent.message')"
          :button-text="$t('cookie_consent.button')"
          theme="dark-lime"
        ></cookie-law>
      </div>
    </footer>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Navigation from "../components/Navigation.vue";
import CookieLaw from "vue-cookie-law";

export default {
  components: {
    Navigation,
    Carousel,
    Slide,
    CookieLaw,
  },
};
</script>

<style>
.navbar-end .navbar-item {
  padding-right: 1.5rem !important;
  padding-left: 1.5rem !important;
}

.navbar-end .navbar-item.has-dropdown {
  padding-left: 1rem !important;
  padding-right: 0.5rem !important;
}

.container-cloud-city {
  position: fixed;
  width: 100vw;
}

.cloud-city {
  width: 26rem;
  height: 26rem;
  max-width: 50vw;
}

@media only screen and (max-width: 456px) {
  .cloudcity {
    margin-top: 5rem;
    width: 100%;
  }
}

.column-main-title {
  padding-top: 7rem;
}

.columns-section {
  position: relative;
}

.icon-checkmark {
  margin-right: 0.7rem;
}

.customer-logo {
  max-width: 35%;
}

.customer-logo-wide {
  max-width: 45%;
}

.customer-logo-extra-wide {
  max-width: 50%;
}

.customer-logo-extra-slim {
  padding-top: 11%;
  padding-bottom: 11%;
}

.customer-logo-slim {
  padding-top: 7%;
  padding-bottom: 7%;
}

.has-image-centered {
  margin-left: auto;
  margin-right: auto;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-content {
  flex-grow: 1;
}

.card-footer {
  width: 100%;
}

.contact-form {
  margin-top: 4rem;
}

.team-content {
  margin-top: 4rem;
}

.technologies-img {
  opacity: 0.5;
}

.timeline-icon {
  position: relative;
  color: white;
}

.timeline-icon-rethink {
  right: -27.5%;
  top: 22%;
}

.timeline-icon-assess {
  right: -33%;
  top: 20%;
}

.timeline-icon-transform {
  right: -27%;
  top: 22%;
}

.timeline-icon-design {
  right: -27%;
  top: 21%;
}

.timeline-icon-build {
  right: -26%;
  top: 21%;
}

.timeline-icon-run {
  right: -24%;
  top: 23%;
}

.is-blinking {
  -webkit-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;
}

@keyframes "blink" {
  from,
  to {
    color: transparent;
  }
  50% {
    color: white;
  }
}

@-webkit-keyframes "blink" {
  from,
  to {
    color: transparent;
  }
  50% {
    color: white;
  }
}

.Cookie--bottom.Cookie--dark-lime .Cookie__button {
  background-color: #3273dc;
  font-family: "Lato", sans-serif;
}
</style>
