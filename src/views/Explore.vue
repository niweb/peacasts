<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { client } from "@/services/listen-api/client";
import { Podcast } from "@/services/listen-api/types";
import PodcastList from "@/components/PodcastGrid.vue";

export default defineComponent({
  name: "Explore",
  components: { PodcastList },
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
  <div>
    <h1>Peacasts</h1>
    <PodcastList :items="podcasts" />
  </div>
</template>
