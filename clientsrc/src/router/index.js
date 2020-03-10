import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../views/Home.vue";
// @ts-ignore
import Profile from "../views/Profile.vue";
// @ts-ignore
import MyWorkouts from "../views/MyWorkouts.vue";
// @ts-ignore
import CurrentWorkout from "../views/CurrentWorkout.vue";
// @ts-ignore
import Dashboard from "../views/Dashboard.vue";
// @ts-ignore
import Stats from "../views/Stats.vue";
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard
  },
  {
    path: "/myworkouts",
    name: "MyWorkouts",
    component: MyWorkouts,
    beforeEnter: authGuard
  },
  {
    path: "/currentworkout",
    name: "CurrentWorkout",
    component: CurrentWorkout,
    beforeEnter: authGuard
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: authGuard
  },
  {
    path: "/stats",
    name: "Stats",
    component: Stats,
    beforeEnter: authGuard
  },
];

const router = new VueRouter({
  routes
});

export default router;
