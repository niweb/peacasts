<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingOverlay",

  props: {
    show: {
      default: false,
      type: Boolean,
    },
  },
});
</script>

<template>
  <div v-if="show" v-loading="true" class="overlay"></div>
  <slot></slot>
</template>

<style lang="scss" scoped>
.overlay {
  width: 100%;
  height: 100%;
}
</style>
