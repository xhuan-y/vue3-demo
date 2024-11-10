import request from "@/utils/request";

const AUTH_BASE_URL = "/api/v1/auth";

const AuthAPI = {
  // 登录接口
  login(data: LoginData) {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("captchaKey", data.captchaKey);
    formData.append("captchaCode", data.captchaCode);
    // 第一个any通常用于表示请求的响应体（payload）的类型，它意味着你可以发送任何类型的对象作为请求体，而ts不会对其进行类型检查
    // axios的类型文件里，post方法接收的泛型第一个参数是any，第二个参数才是返回值的类型
    return request<any, LoginResult>({
      url: `${AUTH_BASE_URL}/login`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // 注销接口
  logout() {
    return request({
      url: `${AUTH_BASE_URL}/logout`,
      method: "delete",
    });
  },

  // 获取验证码接口
  getCaptcha() {
    return request<any, CaptchaResult>({
      url: `${AUTH_BASE_URL}/captcha`,
      method: "get",
    });
  },
};

export default AuthAPI;

/** 登录请求参数 */
export interface LoginData {
  username: string;
  password: string;
  /** 验证码缓存key */
  captchaKey: string;
  /** 验证码 */
  captchaCode: string;
}

/** 登录响应 */
export interface LoginResult {
  accessToken?: string;
  /** 过期时间(单位：毫秒) */
  expires?: number;
  refreshToken?: string;
  tokenType?: string;
}

/** 验证码响应 */
export interface CaptchaResult {
  /** 验证码缓存key */
  captchaKey: string;
  /** 验证码图片Base64字符串 */
  captchaBase64: string;
}
