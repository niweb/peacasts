<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { client } from "@/services/listen-api/client";
import { Episode } from "@/services/listen-api/types";

export default defineComponent({
  name: "RandomEpisode",
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
    <h1>Peacasts</h1>
    <template v-if="episode">
      <el-image :src="episode.image" :fit="fit"> </el-image>
      <pre>{{ episode }}</pre>
    </template>
  </div>
</template>
