<script setup lang="ts">
// import variables from "@/styles/variables.module.scss";

// console.log(variables.bgColor);
</script>

<template>
  <h1>Vite + Vue</h1>

  <div>
    <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
    <el-button type="info"><i-ep-InfoFilled />Info</el-button>
    <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
    <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>
  </div>
  <!-- <div
    style="width: 100px; height: 100px"
    :style="{ 'background-color': variables.bgColor }"
  /> -->
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: $bg-color;
  // color: red;
}
</style>
