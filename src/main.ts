import { createApp } from "vue";
// import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";

// 本地svg图标 引入注册脚本
import 'virtual:svg-icons-register';

// 样式
import "@/styles/index.scss"
import 'uno.css'

createApp(App).use(createPinia()).use(router).mount("#app");
