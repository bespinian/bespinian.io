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
import "bulma/css/bulma.css";
import "bulma-timeline/dist/css/bulma-timeline.min.css";
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

Vue.use(VueScrollTo, { offset: -30 });

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
