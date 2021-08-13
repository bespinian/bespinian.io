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
          <router-link to="/" href="#" class="navbar-item">Home</router-link>
          <LocaleChanger
            :langs="{ en: 'English', de: 'Deutsch' }"
            :locale-mappings="{ be: 'de' }"
          />
        </div>
      </div>
    </nav>

    <br />
    <br />
    <section v-if="customer" class="section">
      <div class="columns is-centered columns-section">
        <div class="column is-half">
          <h2 class="title is-2 is-spaced">
            {{ customer.title }}
          </h2>
          <figure class="image customer-story-logo">
            <img :src="logo" :alt="customer.logo.alt" />
          </figure>
          <br />
          <p>
            <i>"{{ customer.quote.text }}"</i>
          </p>
          <br />
          <p style="float: right">
            {{ customer.quote.stakeholder.name }},
            {{ customer.quote.stakeholder.role }}
          </p>
          <br />
          <br />
          <h3 class="title is-3">{{ $t("customer_story.customer") }}</h3>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="customer.customer"></p>
          <br />
          <h3 class="title is-3">{{ $t("customer_story.background") }}</h3>
          <p>
            {{ customer.background }}
          </p>
          <br />
          <h3 class="title is-3">{{ $t("customer_story.goal") }}</h3>
          <p>{{ customer.goal }}</p>
          <br />
          <h3 class="title is-3">{{ $t("customer_story.contribution") }}</h3>
          <p>
            {{ customer.contribution.intro }}
          </p>
          <br />
          <div v-for="topic in customer.contribution.topics" :key="topic.title">
            <h4 class="title is-4">{{ topic.title }}</h4>
            <p>
              {{ topic.text }}
            </p>
            <br />
          </div>
          <h3 class="title is-3">{{ $t("customer_story.technologies") }}</h3>
          <ul style="list-style-type: circle; padding-left: 30pt">
            <li v-for="technology in customer.technologies" :key="technology">
              {{ technology }}
            </li>
          </ul>
          <br />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Customers from "../customer/customer.js";
import LocaleChanger from "../components/LocaleChanger.vue";

export default {
  components: {
    LocaleChanger,
  },
  data() {
    return {
      showNav: false,
    };
  },
  computed: {
    customer: function () {
      return Customers[this.$route.params.name][this.$i18n.locale];
    },
    logo: function () {
      return require("../assets/" +
        Customers[this.$route.params.name][this.$i18n.locale].logo.file);
    },
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
  },
};
</script>

<style>
.customer-story-logo {
  width: 15rem;
  max-width: 70%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
