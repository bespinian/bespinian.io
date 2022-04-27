import { createApp } from "vue";
import VueCookieAcceptDecline from "vue-cookie-accept-decline";
import "vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css";
import VueGtag from "vue-gtag";
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
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faXing,
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

createApp(App)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .component("vue-cookie-accept-decline", VueCookieAcceptDecline)
  .use(router)
  .use(i18n)
  .use(
    VueGtag,
    {
      config: { id: "UA-132338301-1" },
      enabled: window.location.hostname != "localhost",
    },
    router
  )
  .use(VueScrollTo, { offset: -30 })
  .mount("#app");
