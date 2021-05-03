import { createApp } from "vue";
import App from "@/App.vue";

import "@/registerServiceWorker";
import router from "@/router/routes";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import "@/theme.scss";

createApp(App).use(router).use(ElementPlus).mount("#app");
