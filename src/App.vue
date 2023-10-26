<template>
  <router-view></router-view>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style >
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  outline: none;
}


body {
  font-family: Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
  /* background-image: url("src/assets/SnowMountain(2).png"); */
  background-color: #348cb2;
  /* background-image: url("src/assets/css/images/bg.jpg"); */
  background-size:73%;
  background-repeat: no-repeat;
  /* 防止图片重复平铺 */
  background-attachment: fixed;
  /*固定背景图片，使其在滚动时保持不变 */
}
</style>