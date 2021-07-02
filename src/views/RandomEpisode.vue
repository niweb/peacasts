<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { client } from "@/services/listen-api/client";
import { Episode } from "@/services/listen-api/types";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default defineComponent({
  name: "RandomEpisode",
  components: { LoadingOverlay },
  setup() {
    const loading = ref(true);
    const episode = ref<Episode | null>(null);
    onMounted(async () => {
      try {
        const response = await client.justListen();
        episode.value = response.data;
        loading.value = false;
      } catch (e) {
        console.error(e);
      }
    });
    return {
      loading,
      episode,
    };
  },
});
</script>

<template>
  <div>
    <LoadingOverlay :show="!episode">
      <el-image :src="episode.image" :fit="fit"> </el-image>
      <pre>{{ episode }}</pre>
    </LoadingOverlay>
  </div>
</template>
