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
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/jobs" class="navbar-item">
            {{ $t("jobs.nav_item") }}
          </router-link>
        </div>
      </div>
    </nav>

    <br />
    <br />
    <section class="section">
      <div class="columns is-centered columns-section">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">Cloud Solutions Engineer 60-100%</h3>
          <p>
            We are looking to extend our team of consulting software engineers.
            They each advise multiple customers holistically on different
            technologies and architectures in various cloud and container
            environments. If you like to get to know and work with new bleeding
            edge technologies every day and feel at home in public, private and
            hybrid cloud environments, bespinian is the right place for you!
          </p>
          <br />
          <br />
          <h4 class="title is-4">Requirements</h4>
          <ul>
            <li>
              You have practical experience with Containers, Kubernetes,
              OpenShift, Terraform, AWS, Azure and/or GCP
            </li>
            <li>You are excited about all things DevOps</li>
            <li>You like to work with multiple customers and technologies</li>
            <li>You are fluent in English</li>
            <li>
              You have worked as a software architect but also as a developing
              engineer
            </li>
          </ul>
          <br />
          <h4 class="title is-4">Nice to Have</h4>
          <ul>
            <li>You are fluent in German and/or French</li>
            <li>You have experience developing front end applications</li>
            <li>You have experience developing back end applications</li>
            <li>You have experience developing microservice architectures</li>
            <li>
              You have experience with writing automation and infrastructure as
              code
            </li>
          </ul>
          <br />
          <h4 class="title is-4">Tasks</h4>
          <ul>
            <li>
              You consult our customers on engineering in and around container
              orchestration and the cloud
            </li>
            <li>You co-create software architectures with customers</li>
            <li>
              You help customers implement those architectures in efficient ways
            </li>
            <li>You train customers' teams in their abilities</li>
            <li>You help our customers feel at home in cloud environments</li>
          </ul>
          <br />
          <h4 class="title is-4">What We Offer</h4>
          <ul>
            <li>Flexible ways of working and a lot of responsibility</li>
            <li>Possibilities meeting various customers and companies</li>
            <li>A fast-paced start-up environment</li>
            <li>A great team of fun people with a similar mindset</li>
            <li>Employment level: 60-100%</li>
            <li>Employment date: Flexible</li>
          </ul>
          <br />
          <br />
          <p>
            Are you interested? We highly value diversity. Drop us a line at
            <a href="mailto:jobs@bespinian.io">jobs@bespinian.io</a> and tell us
            why you would like to join our awesome team of architects and
            engineers.
          </p>
          <br />
          <p>
            PS: We aim to fill this position without the help of recruitment
            agencies.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
    };
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
  },
};
</script>
