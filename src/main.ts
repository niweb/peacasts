import { createApp } from "vue";
import App from "@/App.vue";

import "@/registerServiceWorker";
import router from "@/router/routes";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import "@/style/theme.scss";
import MaterialIcon from "@/components/MaterialIcon.vue";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueSnip from "vue-snip";

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(VueSnip)
  .component("material-icon", MaterialIcon)
  .mount("#app");
