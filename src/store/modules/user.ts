import { store } from "@/store";
import AuthAPI, { type LoginData } from "@/api/auth";

import { setToken, clearToken } from "@/utils/auth";

export const useUserStore = defineStore("user", () => {
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

  return { login };
});

// 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例
export function useUserStoreHook() {
  return useUserStore(store);
}
