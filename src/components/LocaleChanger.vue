<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">{{ langs[$i18n.locale] }}</a>
    <div class="navbar-dropdown">
      <a
        v-for="(val, key) in langs"
        :key="key"
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
import { localeStorageKey } from "../i18n";

export default {
  data() {
    return {
      langs: {
        en: "English",
        de: "Deutsch",
        be: "Bärndütsch"
      }
    };
  },
  methods: {
    handleLocaleChange(key) {
      this.$i18n.locale = key;
      store.set(localeStorageKey, key);
    }
  }
};
</script>
