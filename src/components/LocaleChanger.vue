<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a href="#" class="navbar-link">{{ langs[$i18n.locale] }}</a>
    <div class="navbar-dropdown">
      <a
        v-for="(val, key) in langs"
        :key="key"
        href="#"
        class="navbar-item"
        @click="handleLocaleChange(key)"
      >
        {{ val }}
      </a>
    </div>
  </div>
</template>

<script>
import store from "store";
import { LOCALE_STORAGE_KEY } from "../i18n";

export default {
  props: {
    langs: {
      type: Object,
      default: () => ({
        en: "English",
        de: "Deutsch",
        be: "Bärndütsch",
      }),
    },
    localeMappings: {
      type: Object,
      default: () => ({}),
    },
  },
  created: function () {
    this.applyLocaleMappings();
  },
  methods: {
    handleLocaleChange(key) {
      this.$i18n.locale = key;
      store.set(LOCALE_STORAGE_KEY, key);
    },
    applyLocaleMappings() {
      const mappedLocale = this.localeMappings[this.$i18n.locale];
      if (mappedLocale) {
        this.handleLocaleChange(mappedLocale);
      }
    },
  },
};
</script>
