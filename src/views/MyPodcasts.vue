<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Podcast } from "@/services/listen-api/types";
import PodcastGrid from "@/components/PodcastGrid.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { getAllPodcasts } from "@/services/storage/podcasts";

export default defineComponent({
  name: "MyPodcasts",
  components: { LoadingOverlay, PodcastGrid },
  setup() {
    const loading = ref(true);
    const podcasts = ref<Podcast[] | null>(null);

    const loadPodcasts = async () => {
      loading.value = true;
      try {
        podcasts.value = Object.values(await getAllPodcasts());
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      await loadPodcasts();
    });

    return {
      loading,
      podcasts,
    };
  },
});
</script>

<template>
  <LoadingOverlay :show="loading">
    <PodcastGrid :v-loading="loading" :items="podcasts" />
  </LoadingOverlay>
</template>
