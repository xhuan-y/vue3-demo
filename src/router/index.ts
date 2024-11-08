import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

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

export default router;
