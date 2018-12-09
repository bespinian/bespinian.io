import Vue from "vue";
import App from "./App.vue";
import "./../node_modules/bulma/css/bulma.css";
import "./../node_modules/bulma-timeline/dist/css/bulma-timeline.min.css";
import "./../node_modules/@fortawesome/fontawesome-free/css/all.css";
import i18n from "./i18n";

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

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
