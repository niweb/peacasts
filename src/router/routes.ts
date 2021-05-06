import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { Paths } from "@/router/paths";
import Explore from "@/views/Explore.vue";
import NotFound from "@/views/NotFound.vue";
import Episode from "@/views/RandomEpisode.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: Paths.EXPLORE,
    component: Explore,
  },
  {
    path: "/explore",
    name: Paths.EXPLORE,
    component: Explore,
  },
  {
    path: "/episode",
    name: Paths.EPISODE,
    component: Episode,
  },
  {
    path: "/podcast",
    name: Paths.PODCAST,
    component: Episode,
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
