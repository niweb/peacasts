import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { Paths } from "@/router/paths";
import Explore from "@/views/Explore.vue";
import NotFound from "@/views/NotFound.vue";
import PodcastDetail from "@/views/PodcastDetail.vue";
import RandomEpisode from "@/views/RandomEpisode.vue";
import EpisodeDetail from "@/views/EpisodeDetail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { name: Paths.EXPLORE },
  },
  {
    path: "/explore",
    name: Paths.EXPLORE,
    component: Explore,
  },
  {
    path: "/random",
    name: Paths.RANDOM,
    component: RandomEpisode,
  },
  {
    path: "/podcast/:podcastId",
    name: Paths.PODCAST,
    component: PodcastDetail,
  },
  {
    path: "/podcast/:podcastId/episode/:episodeId",
    name: Paths.EPISODE,
    component: EpisodeDetail,
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
