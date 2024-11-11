<script lang="ts" setup>
import AuthAPI, { type LoginData } from "@/api/auth";
import router from "@/router";

import type { FormInstance } from "element-plus";

import { useUserStore } from "@/store";

const userStore = useUserStore();

const loginFormRef = useTemplateRef<FormInstance>("loginFormRef");

const isDark = ref(false);
const loading = ref(false); // 按钮loading状态
const captchaBase64 = ref(); // 验证码图片base64字符串
const loginImage = ref(
  new URL("../../assets/images/login-image.svg", import.meta.url).href
);

const loginData = ref<LoginData>({
  username: "admin",
  password: "123456",
  captchaKey: "",
  captchaCode: "",
});

const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: "请输入用户名",
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: "请输入密码",
      },
      {
        min: 6,
        message: "密码不能少于6位",
        trigger: "blur",
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: "blur",
        message: "请输入验证码",
      },
    ],
  };
});

// 获取验证码
function getCaptcha() {
  AuthAPI.getCaptcha().then((data) => {
    loginData.value.captchaKey = data.captchaKey;
    captchaBase64.value = data.captchaBase64;
  });
}

// 登录
function handleLoginSubmit() {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(loginData.value)
        .then(() => {
          router.push("/");
        })
        .catch(() => {
          getCaptcha();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}

// 主题切换
const toggleTheme = () => {};

onMounted(() => {
  getCaptcha();
});
</script>

<template>
  <div class="login">
    <!-- 登录页头部 -->
    <div class="login-header">
      <div class="flex flex-items-center">
        <el-switch v-model="isDark" @change="toggleTheme" />
        <lang-select class="ml-2 cursor-pointer" />
      </div>
    </div>

    <!-- 登录页内容 -->
    <div class="login-content">
      <div class="login-img">
        <el-image :src="loginImage" style="width: 210px"></el-image>
      </div>
      <div class="login-form">
        <el-form ref="loginFormRef" :model="loginData" :rules="loginRules">
          <div class="form-title">
            <h2>vue3-element-admin</h2>
            <el-dropdown style="position: absolute; right: 0">
              <div class="cursor-pointer">
                <el-icon><i-ep-ArrowDown /></el-icon>
              </div>
            </el-dropdown>
          </div>

          <!-- 用户名 -->
          <el-form-item prop="username">
            <div class="input-wrapper">
              <el-icon class="mx-2">
                <i-ep-User />
              </el-icon>
              <el-input
                v-model="loginData.username"
                placeholder="用户名"
                name="username"
                size="large"
                class="h-[48px]"
              />
            </div>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
            <div class="input-wrapper">
              <el-icon class="mx-2">
                <i-ep-Lock />
              </el-icon>
              <el-input
                v-model="loginData.password"
                placeholder="密码"
                type="password"
                name="password"
                size="large"
                class="h-[48px] pr-2"
                show-password
                @keyup.enter="handleLoginSubmit"
              />
            </div>
          </el-form-item>

          <!-- 验证码 -->
          <el-form-item prop="captchaCode">
            <div class="input-wrapper">
              <svg-icon icon-class="captcha" class="mx-2" />
              <el-input
                v-model="loginData.captchaCode"
                size="large"
                class="flex-1"
                placeholder="验证码"
                autocomplete="off"
                @keyup.enter="handleLoginSubmit"
              />
              <el-image
                :src="captchaBase64"
                class="captcha-img"
                @click="getCaptcha"
              />
            </div>
          </el-form-item>

          <div class="flex justify-between w-full py-1">
            <el-checkbox> 记住我 </el-checkbox>
            <el-link type="primary" href="/forget-password"> 忘记密码 </el-link>
          </div>

          <!-- 登录按钮 -->
          <el-button
            :loading="loading"
            type="primary"
            size="large"
            class="w-full"
            @click.prevent="handleLoginSubmit"
          >
            登 录
          </el-button>

          <!-- 第三方登录 -->
          <el-divider>
            <el-text size="small">其他登录方式</el-text>
          </el-divider>
          <div class="third-party-login">
            <svg-icon icon-class="wechat" class="icon" />
            <svg-icon icon-class="qq" class="icon" />
            <svg-icon icon-class="github" class="icon" />
            <svg-icon icon-class="gitee" class="icon" />
          </div>
        </el-form>
      </div>
    </div>

    <!-- 登录页底部 -->
    <div class="login-footer">
      <el-text size="small">
        Copyright © 2021 - 2024 youlai.tech All Rights Reserved.
        <el-link
          :underline="false"
          href="http://beian.miit.gov.cn/"
          target="_blank"
        >
          皖ICP备20006496号-2
        </el-link>
      </el-text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: url("@/assets/images/login-background-light.jpg") no-repeat center
    right;

  .login-header {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: right;
    width: 100%;
    padding: 15px;
  }
  .login-content {
    display: flex;
    width: 960px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow-light);

    @media (width <= 768px) {
      flex-direction: column;
      max-width: 100%;
      height: 100vh;
      padding: 0 30px;
      border-radius: 0;
      box-shadow: none;
    }

    .login-img {
      display: flex;
      flex: 3;
      align-items: center;
      justify-content: center;
      background: linear-gradient(60deg, #165dff, #6aa1ff);

      @media (width <= 768px) {
        display: none;
      }
    }

    .login-form {
      display: flex;
      flex: 2;
      flex-direction: column;
      justify-content: center;
      min-width: 400px;
      padding: 30px;

      @media (width <= 768px) {
        width: 100%;
        padding: 0 20px;
      }

      .form-title {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0 20px;
        text-align: center;
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
      }

      .captcha-img {
        height: 48px;
        cursor: pointer;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }

      .third-party-login {
        display: flex;
        justify-content: center;
        width: 100%;
        color: var(--el-text-color-secondary);

        *:not(:first-child) {
          margin-left: 20px;
        }

        .icon {
          cursor: pointer;
        }
      }
    }
  }
  .login-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
}

:deep(.el-form-item) {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:state(webkit-autofill) {
      // 通过延时渲染背景色变相去除背景颜色
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}
</style>
