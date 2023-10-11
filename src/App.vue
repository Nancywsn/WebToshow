<template>
  <router-view></router-view>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style >
*{
  margin: 0;
  padding: 0; 
  list-style: none;
  text-decoration: none;
  outline: none;
}


body {
  font-family: Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
  background-image: url("src/assets/SnowMountain(1).png");
  background-size: cover;
  background-repeat: no-repeat; /* 防止图片重复平铺 */
  background-attachment: fixed; /* 固定背景图片，使其在滚动时保持不变 */
}
</style>