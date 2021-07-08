<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { client } from "@/services/listen-api/client";
import { Podcast } from "@/services/listen-api/types";
import PodcastGrid from "@/components/PodcastGrid.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default defineComponent({
  name: "Explore",
  components: { LoadingOverlay, PodcastGrid },
  setup() {
    const loading = ref(true);
    const podcasts = ref<Podcast[] | null>(null);
    const page = ref(1);

    const fetchPodcasts = async () => {
      loading.value = true;
      try {
        const response = await client.fetchBestPodcasts({ page: page.value });
        const newPodcasts = response.data.podcasts;
        podcasts.value = [...(podcasts.value || []), ...newPodcasts];
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      await fetchPodcasts();
    });

    return {
      loading,
      podcasts,
      load: async () => {
        page.value++;
        await fetchPodcasts();
      },
    };
  },
});
</script>

<template>
  <LoadingOverlay :show="loading">
    <PodcastGrid
      v-infinite-scroll="load"
      :v-loading="loading"
      :infinite-scroll-disabled="loading"
      :infinite-scroll-immediate="false"
      :infinite-scroll-distance="500"
      :items="podcasts"
    />
  </LoadingOverlay>
</template>
