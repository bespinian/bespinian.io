import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faPencilAlt,
  faClipboardList,
  faRecycle,
  faBox,
  faRocket,
  faUndo,
  faRssSquare,
  faUser,
  faEnvelope,
  faInfo
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faXing
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./../node_modules/bulma/css/bulma.css";
import "./../node_modules/bulma-timeline/dist/css/bulma-timeline.min.css";
import "typeface-lato";
import i18n from "./i18n";
import VueScrollTo from "vue-scrollto";

library.add(
  faCheck,
  faClipboardList,
  faRecycle,
  faPencilAlt,
  faBox,
  faRocket,
  faUndo,
  faTwitter,
  faGithub,
  faLinkedin,
  faXing,
  faRssSquare,
  faUser,
  faEnvelope,
  faInfo
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

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
