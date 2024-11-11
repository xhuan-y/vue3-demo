import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "./auth";

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getToken();
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;
    if (code === "00000") {
      return response.data.data;
    }

    ElMessage.error(msg || "系统出错");
    return Promise.reject(new Error(msg || "Error"));
  },
  (error: any) => {
    if (error.response.data) {
      const { code, msg } = error.response.data;
      ElMessage.error(msg || "系统出错");
    }
    return Promise.reject(error);
  }
);

export default service;
