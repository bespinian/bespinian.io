<template>
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
        <a v-scroll-to="'#mission'" href="#" class="navbar-item">
          {{ $t("mission.nav_item") }}
        </a>
        <a v-scroll-to="'#services'" href="#" class="navbar-item">
          {{ $t("services.nav_item") }}
        </a>
        <a v-scroll-to="'#tech'" href="#" class="navbar-item">
          {{ $t("technologies.nav_item") }}
        </a>
        <a v-scroll-to="'#partners'" href="#" class="navbar-item">
          {{ $t("partners.nav_item") }}
        </a>
        <a v-scroll-to="'#customers'" href="#" class="navbar-item">
          {{ $t("customers.nav_item") }}
        </a>
        <a v-scroll-to="'#team'" href="#" class="navbar-item">
          {{ $t("team.nav_item") }}
        </a>
        <router-link to="/jobs" href="#" class="navbar-item">
          {{ $t("jobs.nav_item") }}
        </router-link>
        <a v-scroll-to="'#contact'" href="#" class="navbar-item">
          {{ $t("contact.nav_item") }}
        </a>
        <LocaleChanger />
      </div>
    </div>
  </nav>
</template>

<script>
import LocaleChanger from "./LocaleChanger.vue";

export default {
  components: {
    LocaleChanger,
  },
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
