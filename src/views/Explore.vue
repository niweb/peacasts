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
    onMounted(async () => {
      try {
        const response = await client.fetchBestPodcasts();
        podcasts.value = response.data.podcasts;
        loading.value = false;
      } catch (e) {
        console.error(e);
      }
    });

    return {
      loading,
      podcasts,
    };
  },
});
</script>

<template>
  <LoadingOverlay :show="!podcasts">
    <PodcastGrid :items="podcasts" />
  </LoadingOverlay>
</template>
