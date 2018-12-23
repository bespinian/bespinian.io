<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">{{ langs[$i18n.locale] }}</a>
    <div class="navbar-dropdown">
      <a class="navbar-item" v-for="(val, key) in langs" v-on:click="handleLocaleChange(key)" v-bind:key="key" >
        {{ val }}
      </a>
    </div>
  </div>
</template>

<script>
import store from "store";

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
  },
  methods :{
    handleLocaleChange : function(key) {
      this.$i18n.locale = key;
      store.set('locale:teambespin', key);
    }
  }
};
</script>
