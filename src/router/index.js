import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: () =>
      import(/* webpackChunkName: "jobs" */ "../views/JobsView.vue"),
  },
  {
    path: "/customers/:name(citechsensors)",
    name: "Customer",
    component: () =>
      import(
        /* webpackChunkName: "customer" */ "../views/CustomerStoryView.vue"
      ),
  },
  {
    path: "*",
    name: "Catch All",
    component: HomeView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
