<script lang="ts">
import { defineComponent } from "vue";
import { Paths } from "@/router/paths";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const router = useRouter();
    return {
      currentRoute: router.currentRoute,
      Paths,
    };
  },
});
</script>

<template>
  <el-container class="root">
    <el-header class="header">
      <el-menu mode="horizontal" router :default-active="currentRoute.name">
        <el-menu-item
          :route="{ name: Paths.MY_PODCASTS }"
          :index="Paths.MY_PODCASTS"
        >
          My Podcasts
        </el-menu-item>
        <el-menu-item :route="{ name: Paths.EXPLORE }" :index="Paths.EXPLORE">
          Explore
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      Todo: Insert
      <a
        href="https://www.dropbox.com/sh/259hp0metmemgbs/AACsZHZa1xhq7OkrycHmBK27a?dl=0"
      >
        ListenAPI Logo</a
      >
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
.root {
  width: 100vw;
  height: 100vh;
}
.header {
  margin: 0;
}
</style>
