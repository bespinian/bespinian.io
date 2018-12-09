<template>
  <div id="locale-changer" class="navbar-item has-dropdown is-hoverable" style="margin-right:0.5rem">
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
  name: "locale-changer",
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
