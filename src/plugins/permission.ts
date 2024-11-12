import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import NProgress from "@/utils/nprogress";
import { getToken } from "@/utils/auth";
import router from "@/router";
import { usePermissionStore, useUserStore } from "@/store";

export function setupPermission() {
  // 白名单路由
  const whiteList = ["/login"];

  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    // !!对一个值进行两次逻辑非运算
    const isLogin = !!getToken(); // 判断是否登录
    if (isLogin) {
      if (to.path === "/login") {
        // 已登录，访问登录页，跳转到首页
        next({ path: "/" });
      } else {
        const permissionStore = usePermissionStore();
        // 判断路由是否加载
        if (permissionStore.isRoutesLoaded) {
          // $route.matched:是一个数组，包含当前路由的所有嵌套路径片段的路由记录
          if (to.matched.length === 0) {
            // 路由未匹配，跳转到404
            next("/404");
          } else {
            // 动态设置页面标题
            const title =
              (to.params.title as string) || (to.query.title as string);
            if (title) {
              to.meta.title = title;
            }
            next();
          }
        } else {
          try {
            // 生成动态路由
            const dynamicRoutes = await permissionStore.generateRoutes();
            dynamicRoutes.forEach((route: RouteRecordRaw) => {
              router.addRoute(route);
            });
            // TODO:next的用法？
            next({ ...to, replace: true }); // 添加动态路由后重新导航
          } catch (error) {
            // 路由加载失败，重置token并重定向到登录页
            await useUserStore().clearUserSession();
            redirectToLogin(to, next);
            NProgress.done();
          }
        }
      }
    } else {
      // 未登录，判断是否在白名单中
      if (whiteList.includes(to.path)) {
        next();
      } else {
        redirectToLogin(to, next);
        NProgress.done(); // 关闭进度条
      }
    }
  });

  // 后置守卫，保证每次路由跳转结束时关闭进度条
  router.afterEach(() => {
    NProgress.done();
  });
}

// 重定向到登录页
function redirectToLogin(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const params = new URLSearchParams(to.query as Record<string, string>);
  const queryString = params.toString();
  const redirect = queryString ? `${to.path}?${queryString}` : to.path;
  // encodeURIComponent:将字符替换未utf-8编码
  // TODO:为什么要在前面加redirect？方便登录之后返回当前页面？
  next(`/login?redirect=${encodeURIComponent(redirect)}`);
}

// 判断是否有权限
export function hasAuth(
  value: string | string[],
  type: "button" | "role" = "button" // type为button或role,默认为button
) {
  const { roles, perms } = useUserStore().userInfo;

  // 超级管理员 拥有所有权限
  if (type === "button" && roles.includes("ROOT")) {
    return true;
  }

  const auths = type === "button" ? perms : roles;
  return typeof value === "string"
    ? auths.includes(value)
    : value.some((perm) => auths.includes(perm));
}
