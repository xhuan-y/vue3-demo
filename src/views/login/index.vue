<script lang="ts" setup>
const isDark = ref(false);

// 主题切换
const toggleTheme = () => {};
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
    <div class="login-content">内容</div>

    <!-- 登录页底部 -->
    <div class="login-footer">底部</div>
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
    background-color: skyblue;
  }
  .login-footer {
    background-color: yellow;
  }
}
</style>
