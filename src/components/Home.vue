<template>
  <div id="home">
    <nav
      class="navbar is-link is-fixed-top"
      role="navigation"
      aria-label="main-navigation"
    >
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          :class="{ 'is-active': showNav }"
          @click="toggleNav()"
        >
          <span aria-hidden="true"></span> <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbar-menu"
        class="navbar-menu"
        :class="{ 'is-active': showNav }"
        @click="toggleNav()"
      >
        <div class="navbar-end">
          <a v-scroll-to="'#mission'" class="navbar-item" href="#">{{
            $t("mission.nav_item")
          }}</a>
          <a v-scroll-to="'#services'" class="navbar-item" href="#">{{
            $t("services.nav_item")
          }}</a>
          <a v-scroll-to="'#tech'" class="navbar-item" href="#">{{
            $t("technologies.nav_item")
          }}</a>
          <a v-scroll-to="'#team'" class="navbar-item" href="#">{{
            $t("team.nav_item")
          }}</a>
          <a v-scroll-to="'#contact'" class="navbar-item" href="#">{{
            $t("contact.nav_item")
          }}</a>
          <LocaleChanger />
        </div>
      </div>
    </nav>

    <section class="hero is-link is-fullheight">
      <div class="hero-body">
        <div class="container" style="position:fixed; width:100vw">
          <div class="columns">
            <div class="column is-offset-1-desktop" style="padding-top:7rem;">
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
      <div class="columns is-centered" style="position:relative;">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("mission.title") }}</h3>
          <p>{{ $t("mission.body") }}</p>
          <div class="content" style="margin-top:4rem;">
            <div class="columns">
              <div
                class="column is-centered is-half-desktop is-offset-one-quarter-desktop"
              >
                <div class="box">
                  <div class="card-content">
                    <p class="title is-4">
                      {{ $t("mission.solutions.title") }}
                    </p>
                    <div class="content">
                      <p>
                        <span
                          class="icon has-text-link"
                          style="margin-right:0.7rem"
                          ><font-awesome-icon icon="check"/></span
                        >{{ $t("mission.solutions.operate") }}
                      </p>
                      <p>
                        <span
                          class="icon has-text-link"
                          style="margin-right:0.7rem"
                          ><font-awesome-icon icon="check"/></span
                        >{{ $t("mission.solutions.adaptable") }}
                      </p>
                      <p>
                        <span
                          class="icon has-text-link"
                          style="margin-right:0.7rem"
                          ><font-awesome-icon icon="check"/></span
                        >{{ $t("mission.solutions.scalable") }}
                      </p>
                      <p>
                        <span
                          class="icon has-text-link"
                          style="margin-right:0.7rem"
                          ><font-awesome-icon icon="check"/></span
                        >{{ $t("mission.solutions.optimized") }}
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
      <div class="columns is-centered" style="position:relative;">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("services.title") }}</h3>
          <p>{{ $t("services.body") }}</p>
          <div class="content" style="margin-top:4rem;">
            <div class="timeline is-centered">
              <div class="timeline-item">
                <div class="timeline-marker is-icon is-link">
                  <font-awesome-icon
                    icon="clipboard-list"
                    size="xs"
                    :style="{ color: 'white' }"
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
                <div class="timeline-marker is-icon is-link">
                  <font-awesome-icon
                    icon="recycle"
                    size="xs"
                    :style="{ color: 'white' }"
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
                <div class="timeline-marker is-icon is-link">
                  <font-awesome-icon
                    icon="pencil-alt"
                    size="xs"
                    :style="{ color: 'white' }"
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
                <div class="timeline-marker is-icon is-link">
                  <font-awesome-icon
                    icon="box"
                    size="xs"
                    :style="{ color: 'white' }"
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
                <div class="timeline-marker is-icon is-link">
                  <font-awesome-icon
                    icon="rocket"
                    size="xs"
                    :style="{ color: 'white' }"
                  />
                </div>
                <div class="timeline-content">
                  <p class="heading">{{ $t("services.timeline.run.title") }}</p>
                  <p>{{ $t("services.timeline.run.body") }}</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-icon is-link">
                  <font-awesome-icon
                    icon="undo"
                    size="xs"
                    :style="{ color: 'white' }"
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
      <div class="columns is-centered" style="position:relative;">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("technologies.title") }}</h3>
          <p>
            {{ $t("technologies.platforms.body.intro") }}
            <strong>{{ $t("technologies.platforms.body.platforms") }}</strong>
            {{ $t("technologies.platforms.body.weAreNativeTo") }}:
          </p>
          <br />
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <div class="tile is-child has-text-centered tech-logo">
                <figure class="image">
                  <img src="../assets/aws.svg" alt="AWS" />
                </figure>
                <br />
                <a
                  href="https://aws.amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >AWS</a
                >
              </div>
              <div class="tile is-child has-text-centered tech-logo">
                <figure class="image">
                  <img src="../assets/openshift.svg" alt="OpenShift" />
                </figure>
                <br />
                <a
                  href="https://www.openshift.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >OpenShift</a
                >
              </div>
              <div class="tile is-child has-text-centered tech-logo">
                <figure class="image">
                  <img src="../assets/cloudfoundry.svg" alt="Cloud Foundry" />
                </figure>
                <br />
                <a
                  href="https://www.cloudfoundry.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Cloud Foundry</a
                >
              </div>
              <div class="tile is-child has-text-centered tech-logo">
                <figure class="image">
                  <img src="../assets/kubernetes.svg" alt="Kubernetes" />
                </figure>
                <br />
                <a
                  href="https://kubernetes.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Kubernetes</a
                >
              </div>
              <div class="tile is-child has-text-centered tech-logo">
                <figure class="image">
                  <img src="../assets/docker.svg" alt="Docker" />
                </figure>
                <br />
                <a
                  href="https://www.docker.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Docker</a
                >
              </div>
            </div>
          </div>
          <p>
            {{ $t("technologies.tools.body.intro") }}
            <strong>{{ $t("technologies.tools.body.tools") }}</strong
            >:
          </p>
          <br />
          <div class="tile is-ancestor">
            <div class="tile is-vertical">
              <div class="tile is-parent">
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/golang.svg" alt="Go" />
                  </figure>
                  <br />
                  <a
                    href="https://golang.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Go</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/nodejs.svg" alt="Node.js" />
                  </figure>
                  <br />
                  <a
                    href="https://nodejs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Node.js</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/springboot.svg" alt="Spring Boot" />
                  </figure>
                  <br />
                  <a
                    href="https://spring.io/projects/spring-boot"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Spring Boot</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/react.svg" alt="React" />
                  </figure>
                  <br />
                  <a
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >React</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/graphql.svg" alt="GraphQL" />
                  </figure>
                  <br />
                  <a
                    href="https://graphql.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >GraphQL</a
                  >
                </div>
              </div>
              <div class="tile is-parent">
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/terraform.svg" alt="Terraform" />
                  </figure>
                  <br />
                  <a
                    href="https://www.terraform.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Terraform</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/concourse.svg" alt="Concourse" />
                  </figure>
                  <br />
                  <a
                    href="https://concourse-ci.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Concourse</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/jenkins.svg" alt="Jenkins" />
                  </figure>
                  <br />
                  <a
                    href="https://jenkins.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Jenkins</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/rabbitmq.svg" alt="RabbitMQ" />
                  </figure>
                  <br />
                  <a
                    href="https://www.rabbitmq.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    >RabbitMQ</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/kafka.svg" alt="Kafka" />
                  </figure>
                  <br />
                  <a
                    href="https://kafka.apache.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Kafka</a
                  >
                </div>
              </div>
              <div class="tile is-parent">
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/redis.svg" alt="Redis" />
                  </figure>
                  <br />
                  <a
                    href="https://redis.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Redis</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img
                      src="../assets/elasticsearch.svg"
                      alt="Elasticsearch"
                    />
                  </figure>
                  <br />
                  <a
                    href="https://www.elastic.co/products/elasticsearch"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Elasticsearch</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/mongodb.svg" alt="MongoDB" />
                  </figure>
                  <br />
                  <a
                    href="https://www.mongodb.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    >MongoDB</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/postgresql.svg" alt="PostgreSQL" />
                  </figure>
                  <br />
                  <a
                    href="https://www.postgresql.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >PostgreSQL</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/dynamodb.svg" alt="DynamoDB" />
                  </figure>
                  <br />
                  <a
                    href="https://aws.amazon.com/dynamodb"
                    target="_blank"
                    rel="noopener noreferrer"
                    >DynamoDB</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="team" class="section">
      <div class="columns is-centered" style="position:relative;">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("team.title") }}</h3>
          <p>{{ $t("team.body") }}</p>
          <div class="content" style="margin-top:4rem;">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <article class="tile is-child">
                  <div class="card">
                    <div class="card-content">
                      <figure class="image is-128x128 is-centered">
                        <img
                          class="is-rounded"
                          src="../assets/mathis.jpg"
                          alt="Mathis Kretz"
                        />
                      </figure>
                      <br />
                      <p class="title">
                        {{ $t("team.member-1.name") }}
                      </p>
                      <p class="subtitle">
                        {{ $t("team.member-1.catchphrase") }}
                      </p>
                      <div class="content">{{ $t("team.member-1.body") }}</div>
                    </div>
                    <footer class="card-footer">
                      <a
                        class="card-footer-item"
                        href="https://twitter.com/mathis_kretz"
                        target="_blank"
                        rel="noopener noreferrer"
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
                      >
                        <font-awesome-icon :icon="['fab', 'xing']" />
                      </a>
                    </footer>
                  </div>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child">
                  <div class="card">
                    <div class="card-content">
                      <figure class="image is-128x128">
                        <img
                          class="is-rounded"
                          src="../assets/tobi.jpg"
                          alt="Tobi Fuhrimann"
                        />
                      </figure>
                      <br />
                      <p class="title">
                        {{ $t("team.member-2.name") }}
                      </p>
                      <p class="subtitle">
                        {{ $t("team.member-2.catchphrase") }}
                      </p>
                      <div class="content">{{ $t("team.member-2.body") }}</div>
                    </div>
                    <footer class="card-footer">
                      <a
                        class="card-footer-item"
                        href="https://twitter.com/mastertinner"
                        target="_blank"
                        rel="noopener noreferrer"
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
                      >
                        <span class="icon">
                          <font-awesome-icon :icon="['fab', 'github']" />
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://www.linkedin.com/in/tobi-fuhrimann/"
                        target="_blank"
                        rel="noopener noreferrer"
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
                      >
                        <span class="icon">
                          <font-awesome-icon icon="rss-square" />
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
      <div class="columns is-centered" style="position:relative;">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">{{ $t("contact.title") }}</h3>
          <p>{{ $t("contact.body") }}</p>
          <form
            class="content"
            style="margin-top:4rem;"
            action="https://formspree.io/contact@bespinian.io"
            method="POST"
          >
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  name="name"
                  :placeholder="$t('contact.form.nameplaceholder')"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="user" />
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="email"
                  name="email"
                  :placeholder="$t('contact.form.emailplaceholder')"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="envelope" />
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  name="subject"
                  :placeholder="$t('contact.form.subjectplaceholder')"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="info" />
                </span>
              </p>
            </div>
            <div class="field">
              <div class="control">
                <textarea
                  class="textarea"
                  name="message"
                  :placeholder="$t('contact.form.messageplaceholder')"
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
      </div>
    </footer>
  </div>
</template>

<script>
import LocaleChanger from "./LocaleChanger.vue";

export default {
  components: {
    LocaleChanger
  },
  data() {
    return {
      showNav: false
    };
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    }
  }
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

.tech-logo {
  padding: 5%;
  max-width: 30vw;
}

.tile.is-child.tech-logo {
  margin: 0 auto !important;
}

.card {
  height: 100%;
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
</style>
