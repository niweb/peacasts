import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { Paths } from "@/router/paths";
import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: Paths.HOME,
    component: Home,
  },
  {
    path: "/:pathMatch(.*)",
    name: Paths.NOT_FOUND,
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
