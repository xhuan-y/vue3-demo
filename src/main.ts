import { createApp } from "vue";
import App from "./App.vue";
import setupPlugins from "@/plugins";

// 本地svg图标 引入注册脚本
import "virtual:svg-icons-register";

// 样式
import "@/styles/index.scss";
import "uno.css";

const app = createApp(App);
// 注册插件
app.use(setupPlugins);
app.mount("#app");
