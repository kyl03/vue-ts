import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import loggedInGuard from "./user-guard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    beforeEnter: loggedInGuard,
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    // beforeEnter: notLoggedInGuard,
    component: LoginView,
  },
  {
    path: "/profile",
    name: "profile",
    beforeEnter: loggedInGuard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ProfileView,
    // component: () => import(/* webpackChunkName: "about" */ '../views/ProfileView.vue'),
  },
  {
    path: "/detail/:id",
    name: "detail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DetailView.vue"),
    props: (route) => {
      const id = Number(route.params.id);
      const userRole = localStorage.getItem("userRole");
      return isNaN(id) ? { id: null, userRole } : { id, userRole };
    },
  },
  {
    path: "/:pathMatch(.*)",
    component: import(/*webpackChunkName: notFound*/ "../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
