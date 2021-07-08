<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Podcast } from "@/services/listen-api/types";
import { useRouter } from "vue-router";
import { Paths } from "@/router/paths";

export default defineComponent({
  name: "PodcastGrid",

  props: {
    items: {
      type: Array as PropType<Podcast[]>,
      default: () => [],
    },
  },

  setup() {
    const router = useRouter();
    return {
      openPodcastDetailPage(podcast: Podcast) {
        router.push({ name: Paths.PODCAST, params: { podcastId: podcast.id } });
      },
    };
  },
});
</script>

<template>
  <div class="grid">
    <el-card
      v-for="item in items"
      :key="item.id"
      shadow="hover"
      class="card"
      @click="openPodcastDetailPage(item)"
    >
      <el-image :src="item.image" class="image" :alt="item.title"> </el-image>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: space-around;
  grid-gap: 20px;
}

.card {
  cursor: pointer;
}
</style>
