<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">{{ langs[$i18n.locale] }}</a>
    <div class="navbar-dropdown">
      <a class="navbar-item" v-for="(val, key) in langs" v-on:click="$i18n.locale = key" v-bind:key="key" >
        {{ val }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "LocaleChanger",
  data() {
    return {
      langs: {
        en: "English",
        de: "Deutsch",
        be: "Bärndütsch"
      }
    };
  }
};
</script>
