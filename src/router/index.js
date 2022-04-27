import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
    path: "/customers/:name",
    name: "Customer",
    component: () =>
      import(
        /* webpackChunkName: "customer" */ "../views/CustomerStoryView.vue"
      ),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Catch All",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

export default router;
