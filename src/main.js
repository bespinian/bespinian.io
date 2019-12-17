import Vue from "vue";
import VueAnalytics from "vue-analytics";
import VueScrollTo from "vue-scrollto";
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
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";

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

Vue.use(VueAnalytics, {
  id: "UA-132338301-1",
  router
});

Vue.use(VueScrollTo, { offset: -30 });

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
