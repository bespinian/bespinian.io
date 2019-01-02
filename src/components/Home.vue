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
          v-on:click="toggleNav()"
          v-bind:class="{ 'is-active': showNav }"
        >
          <span aria-hidden="true"></span> <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbar-menu"
        class="navbar-menu"
        v-bind:class="{ 'is-active': showNav }"
        v-on:click="toggleNav()"
      >
        <div class="navbar-end">
          <a class="navbar-item" href="#" v-scroll-to="'#mission'">{{
            $t("mission.nav_item")
          }}</a>
          <a class="navbar-item" href="#" v-scroll-to="'#services'">{{
            $t("services.nav_item")
          }}</a>
          <a class="navbar-item" href="#" v-scroll-to="'#tech'">{{
            $t("technologies.nav_item")
          }}</a>
          <a class="navbar-item" href="#" v-scroll-to="'#team'">{{
            $t("team.nav_item")
          }}</a>
          <a class="navbar-item" href="#" v-scroll-to="'#contact'">{{
            $t("contact.nav_item")
          }}</a>
          <LocaleChanger />
        </div>
      </div>
    </nav>

    <section class="hero is-link is-fullheight">
      <div class="hero-body">
        <div class="container" style="position:fixed;">
          <div class="columns">
            <div class="column is-offset-1-desktop" style="padding-top:7rem;">
              <h1 class="title is-1 is-spaced">
                be<span class="is-blinking">|</span>spin
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
                          ><i class="fas fa-check"></i></span
                        >{{ $t("mission.solutions.operate") }}
                      </p>
                      <p>
                        <span
                          class="icon has-text-link"
                          style="margin-right:0.7rem"
                          ><i class="fas fa-check"></i></span
                        >{{ $t("mission.solutions.adaptable") }}
                      </p>
                      <p>
                        <span
                          class="icon has-text-link"
                          style="margin-right:0.7rem"
                          ><i class="fas fa-check"></i></span
                        >{{ $t("mission.solutions.scalable") }}
                      </p>
                      <p>
                        <span
                          class="icon has-text-link"
                          style="margin-right:0.7rem"
                          ><i class="fas fa-check"></i></span
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
                  <i class="fa fa-clipboard-list"></i>
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
                  <i class="fa fa-recycle"></i>
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
                  <i class="fa fa-pencil-alt"></i>
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
                  <i class="fa fa-box"></i>
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
                  <i class="fa fa-rocket"></i>
                </div>
                <div class="timeline-content">
                  <p class="heading">{{ $t("services.timeline.run.title") }}</p>
                  <p>{{ $t("services.timeline.run.body") }}</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-icon is-link">
                  <i class="fa fa-undo"></i>
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
          <p v-html="$t('technologies.platforms.body')"></p>
          <br />
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <div class="tile is-child has-text-centered tech-logo">
                <figure class="image">
                  <img src="../assets/aws.svg" alt="AWS" />
                </figure>
                <br />
                <a href="https://aws.amazon.com" target="_blank">AWS</a>
              </div>
              <div class="tile is-child has-text-centered tech-logo">
                <figure class="image">
                  <img src="../assets/openshift.svg" alt="OpenShift" />
                </figure>
                <br />
                <a href="https://www.openshift.com" target="_blank"
                  >OpenShift</a
                >
              </div>
              <div class="tile is-child has-text-centered tech-logo">
                <figure class="image">
                  <img src="../assets/cloudfoundry.svg" alt="Cloud Foundry" />
                </figure>
                <br />
                <a href="https://www.cloudfoundry.org" target="_blank"
                  >Cloud Foundry</a
                >
              </div>
              <div class="tile is-child has-text-centered tech-logo">
                <figure class="image">
                  <img src="../assets/kubernetes.svg" alt="Kubernetes" />
                </figure>
                <br />
                <a href="https://kubernetes.io" target="_blank">Kubernetes</a>
              </div>
              <div class="tile is-child has-text-centered tech-logo">
                <figure class="image">
                  <img src="../assets/docker.svg" alt="Docker" />
                </figure>
                <br />
                <a href="https://www.docker.com" target="_blank">Docker</a>
              </div>
            </div>
          </div>
          <p v-html="$t('technologies.tools.body')"></p>
          <br />
          <div class="tile is-ancestor">
            <div class="tile is-vertical">
              <div class="tile is-parent">
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/golang.svg" alt="Go" />
                  </figure>
                  <br />
                  <a href="https://golang.org" target="_blank">Go</a>
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/nodejs.svg" alt="Node.js" />
                  </figure>
                  <br />
                  <a href="https://nodejs.org" target="_blank">Node.js</a>
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/springboot.svg" alt="Spring Boot" />
                  </figure>
                  <br />
                  <a
                    href="https://spring.io/projects/spring-boot"
                    target="_blank"
                    >Spring Boot</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/react.svg" alt="React" />
                  </figure>
                  <br />
                  <a href="https://reactjs.org" target="_blank">React</a>
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/graphql.svg" alt="GraphQL" />
                  </figure>
                  <br />
                  <a href="https://graphql.org" target="_blank">GraphQL</a>
                </div>
              </div>
              <div class="tile is-parent">
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/terraform.svg" alt="Terraform" />
                  </figure>
                  <br />
                  <a href="https://www.terraform.io" target="_blank"
                    >Terraform</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/concourse.svg" alt="Concourse" />
                  </figure>
                  <br />
                  <a href="https://concourse-ci.org" target="_blank"
                    >Concourse</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/jenkins.svg" alt="Jenkins" />
                  </figure>
                  <br />
                  <a href="https://jenkins.io" target="_blank">Jenkins</a>
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/rabbitmq.svg" alt="RabbitMQ" />
                  </figure>
                  <br />
                  <a href="https://www.rabbitmq.com" target="_blank"
                    >RabbitMQ</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/kafka.svg" alt="Kafka" />
                  </figure>
                  <br />
                  <a href="https://kafka.apache.org" target="_blank">Kafka</a>
                </div>
              </div>
              <div class="tile is-parent">
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/redis.svg" alt="Redis" />
                  </figure>
                  <br />
                  <a href="https://redis.io" target="_blank">Redis</a>
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
                    >Elasticsearch</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/mongodb.svg" alt="MongoDB" />
                  </figure>
                  <br />
                  <a href="https://www.mongodb.com" target="_blank">MongoDB</a>
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/postgresql.svg" alt="PostgreSQL" />
                  </figure>
                  <br />
                  <a href="https://www.postgresql.org" target="_blank"
                    >PostgreSQL</a
                  >
                </div>
                <div class="tile is-child has-text-centered tech-logo">
                  <figure class="image">
                    <img src="../assets/dynamodb.svg" alt="DynamoDB" />
                  </figure>
                  <br />
                  <a href="https://aws.amazon.com/dynamodb" target="_blank"
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
                      <div class="media">
                        <div class="media-left">
                          <figure class="image is-128x128">
                            <img
                              class="is-rounded"
                              src="../assets/gopher.png"
                              alt="Gabriel Müller"
                            />
                          </figure>
                        </div>
                        <div class="media-content">
                          <p class="title is-4">
                            {{ $t("team.member-1.name") }}
                          </p>
                          <p class="subtitle is-6">
                            {{ $t("team.member-1.catchphrase") }}
                          </p>
                        </div>
                      </div>
                      <br />
                      <div class="content">{{ $t("team.member-1.body") }}</div>
                    </div>
                    <footer class="card-footer">
                      <a
                        class="card-footer-item"
                        href="https://twitter.com/"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-twitter"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://github.com/"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-github"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://www.linkedin.com/in/"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-linkedin"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://www.xing.com/profile/"
                        target="_blank"
                      >
                        <span class="icon"> <i class="fab fa-xing"></i> </span>
                      </a>
                    </footer>
                  </div>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child">
                  <div class="card">
                    <div class="card-content">
                      <div class="media">
                        <div class="media-left">
                          <figure class="image is-128x128">
                            <img
                              class="is-rounded"
                              src="https://pbs.twimg.com/profile_images/928975001105166336/dhnwx8fA_400x400.jpg"
                              alt="Tobi Fuhrimann"
                            />
                          </figure>
                        </div>
                        <div class="media-content">
                          <p class="title is-4">
                            {{ $t("team.member-2.name") }}
                          </p>
                          <p class="subtitle is-6">
                            {{ $t("team.member-2.catchphrase") }}
                          </p>
                        </div>
                      </div>
                      <br />
                      <div class="content">{{ $t("team.member-2.body") }}</div>
                    </div>
                    <footer class="card-footer">
                      <a
                        class="card-footer-item"
                        href="https://twitter.com/mastertinner"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-twitter"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://github.com/mastertinner"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-github"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://www.linkedin.com/in/tobi-fuhrimann-83642746"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-linkedin"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://berndsgn.ch"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fas fa-rss-square"></i>
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
            action="https://formspree.io/contact@teambespin.io"
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
                  <i class="fas fa-user"></i>
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
                  <i class="fas fa-envelope"></i>
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
                  <i class="fas fa-info"></i>
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
        <p><strong>team be|spin</strong> {{ (new Date()).getFullYear() }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import LocaleChanger from "./LocaleChanger.vue";

export default {
  name: "Home",
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
