<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MaterialIcon",
});
</script>

<template>
  <i class="material-icon"><slot></slot></i>
</template>

<style lang="scss" scoped>
/** Icons */
@import "~@fontsource/material-icons-outlined/index.css";

.material-icon {
  font-family: "Material Icons Outlined", sans-serif;
  font-weight: normal;
  font-style: normal;
  font-size: 20px; /* Preferred icon size */
  display: inline-block;
  vertical-align: text-bottom;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}
</style>
