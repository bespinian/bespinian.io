import Vue from "vue";
import App from "./App.vue";
import "./../node_modules/bulma/css/bulma.css";
import "./../node_modules/bulma-timeline/dist/css/bulma-timeline.min.css";
import "./../node_modules/@fortawesome/fontawesome-free/css/all.css";
import i18n from "./i18n";
import VueScrollTo from "vue-scrollto";

// navbar burger
document.addEventListener("DOMContentLoaded", () => {
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach($el => {
      $el.addEventListener("click", () => {
        const target = $el.dataset.target;
        const $target = document.getElementById(target);
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

Vue.use(VueScrollTo, { offset: -30 });

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
