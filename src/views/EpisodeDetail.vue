<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "EpisodeDetail",

  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
});
</script>

<template>
  <pre>
    {{ JSON.stringify(route, null, 4) }}
  </pre>
</template>
