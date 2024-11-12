import { store } from "@/store";
import { usePermissionStoreHook } from "@/store/modules/permission";

import AuthAPI, { type LoginData } from "@/api/auth";
import UserAPI, { type UserInfo } from "@/api/system/user";

import { setToken, clearToken } from "@/utils/auth";

export const useUserStore = defineStore("user", () => {
  // useStorage:创建可用于访问和修改 LocalStorage（默认） 或 SessionStorage 的反应式引用。
  const userInfo = useStorage<UserInfo>("userInfo", {} as UserInfo);

  // 登录
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.login(loginData)
        .then((data) => {
          const { tokenType, accessToken } = data;
          setToken(tokenType + " " + accessToken);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 获取用户信息
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      UserAPI.getInfo()
        .then((data) => {
          if (!data) {
            reject("Verification failed, please Login again.");
            return;
          }
          Object.assign(userInfo.value, { ...data });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // TODO:登出

  // 清理用户会话
  function clearUserSession() {
    return new Promise<void>((resolve) => {
      clearToken();
      usePermissionStoreHook().resetRouter();
      // TODO:清除字典
      resolve();
    });
  }

  return { userInfo, login, getUserInfo, clearUserSession };
});

// 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例
export function useUserStoreHook() {
  return useUserStore(store);
}
