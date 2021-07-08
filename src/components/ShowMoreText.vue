<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ShowMoreText",

  props: {
    text: {
      required: true,
      type: String,
    },

    lines: {
      default: 3,
      type: Number,
    },
  },

  setup() {
    const expanded = ref(false);
    return {
      expanded,
      toggleExpand() {
        expanded.value = !expanded.value;
      },
    };
  },
});
</script>

<template>
  <p v-if="expanded" v-html="text"></p>
  <p v-else v-snip="lines" v-html="text"></p>
  <div class="button-wrapper">
    <el-button type="text" @click="toggleExpand">{{
      expanded ? "Show less" : "Show more"
    }}</el-button>
  </div>
</template>

<style lang="scss" scoped>
.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>
