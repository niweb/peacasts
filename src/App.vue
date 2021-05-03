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
  <div class="root">
    <nav>
      <el-menu mode="horizontal" router :default-active="currentRoute.name">
        <el-menu-item :route="{ name: Paths.HOME }" :index="Paths.HOME">
          Home
        </el-menu-item>
      </el-menu>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.root {
  width: 100vw;
  height: 100vh;
}

main {
  width: 100vw;
  height: 100vh;
}
</style>
