import type { App } from "vue";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

export const HelloWorld = () => import("@/components/HelloWorld.vue");

const routes: RouteRecordRaw[] = [
  { path: "/", component: HelloWorld },
  { path: "/about", component: () => import("@/components/About.vue") },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
