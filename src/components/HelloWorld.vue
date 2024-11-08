<script setup lang="ts">
// import variables from "@/styles/variables.module.scss";
import { useCounterStore } from "@/store/counter";
const counterStore = useCounterStore();

defineProps<{ msg: string }>();

// console.log(variables.bgColor);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="counterStore.increment">count is {{ counterStore.count }}</button>
  </div>

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
