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
        <a v-scroll-to="'#mission'" class="navbar-item" href="#">
          {{ $t("mission.nav_item") }}
        </a>
        <a v-scroll-to="'#services'" class="navbar-item" href="#">
          {{ $t("services.nav_item") }}
        </a>
        <a v-scroll-to="'#tech'" class="navbar-item" href="#">
          {{ $t("technologies.nav_item") }}
        </a>
        <a v-scroll-to="'#partners'" class="navbar-item" href="#">
          {{ $t("partners.nav_item") }}
        </a>
        <a v-scroll-to="'#customers'" class="navbar-item" href="#">
          {{ $t("customers.nav_item") }}
        </a>
        <a v-scroll-to="'#team'" class="navbar-item" href="#">
          {{ $t("team.nav_item") }}
        </a>
        <router-link to="/jobs" class="navbar-item" href="#">
          {{ $t("jobs.nav_item") }}
        </router-link>
        <a v-scroll-to="'#contact'" class="navbar-item" href="#">
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
