import type { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import { store } from "@/store";
import router from "@/router";

import MenuAPI, { type RouteVO } from "@/api/system/menu";
const modules = import.meta.glob("../../views/**/**.vue"); // 动态加载指定路径下的所有 .vue 文件
const Layout = () => import("@/layout/index.vue");

export const usePermissionStore = defineStore("permission", () => {
  // 所有路由，包括静态和动态路由
  const routes = ref<RouteRecordRaw[]>([]);
  // TODO:混合模式左侧菜单，这是做什么的？
  // const mixLeftMenus = ref<RouteRecordRaw[]>([]);
  // 路由是否已加载
  const isRoutesLoaded = ref(false);

  // 生成动态路由
  function generateRoutes() {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      MenuAPI.getRoutes()
        .then((data) => {
          // 返回的data是一个对象数组，每个对象对应一个路由配置
          const dynamicRoutes = transformRoutes(data);
          routes.value = constantRoutes.concat(dynamicRoutes);
          isRoutesLoaded.value = true;
          resolve(dynamicRoutes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 重置路由
  const resetRouter = () => {
    // 删除动态路由，保留静态路由
    routes.value.forEach((route) => {
      // 遍历每个route，如果route.name在constantRoutes里找不到就将该路由删除
      if (route.name && !constantRoutes.find((r) => r.name === route.name)) {
        // 从router实例中移除动态路由
        // removeRoute: 根据名称删除一个现有路由
        router.removeRoute(route.name);
      }
    });

    routes.value = [];
    isRoutesLoaded.value = false;
  };

  return {
    routes,
    generateRoutes,
    isRoutesLoaded,
    resetRouter,
  };
});

// 将每个路由对象的component的值转为真正的组件
const transformRoutes = (routes: RouteVO[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmpRoute = { ...route } as RouteRecordRaw;
    // 顶级目录，替换为Layout组件
    if (tmpRoute.component?.toString() === "Layout") {
      tmpRoute.component = Layout;
    } else {
      // 其他菜单，根据组件路径动态加载组件
      const component = modules[`../../views/${tmpRoute.component}.vue`];
      if (component) {
        tmpRoute.component = component;
      } else {
        tmpRoute.component = modules["../../views/error/404.vue"];
      }
    }

    if (tmpRoute.children) {
      tmpRoute.children = transformRoutes(route.children);
    }

    asyncRoutes.push(tmpRoute);
  });

  return asyncRoutes;
};

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
