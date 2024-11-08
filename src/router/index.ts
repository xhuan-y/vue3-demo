import { createRouter, createWebHashHistory } from "vue-router";

export const HelloWorld = () => import("@/components/HelloWorld.vue");

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/about", component: () => import("@/components/About.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
