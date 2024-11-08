import { createApp } from "vue";
// import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";

// 样式
import "@/styles/index.scss"
import 'uno.css'

createApp(App).use(createPinia()).use(router).mount("#app");
