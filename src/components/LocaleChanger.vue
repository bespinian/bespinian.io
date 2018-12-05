<template>
  <div id="locale-changer" class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">{{ langs[$i18n.locale] }}</a>
    <select class="navbar-dropdown" v-model="$i18n.locale">
      <option class="navbar-item" v-for="(val, key) in langs" :key="key" :value="key">
        {{ val }}
      </option>
    </select>
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
