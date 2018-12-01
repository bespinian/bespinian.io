import Vue from "vue";
import App from "./App.vue";
import "./../node_modules/bulma/css/bulma.css";
import "./../node_modules/bulma-timeline/dist/css/bulma-timeline.min.css";
import "./../node_modules/@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
