<template>
  <el-menu
    :default-active="$route.path"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/">
      <el-icon><house /></el-icon>
      <span>主页</span>
    </el-menu-item>
    <el-menu-item index="/page1">
      <el-icon><document /></el-icon>
      <span>页面1</span>
    </el-menu-item>
    <el-menu-item index="/page2">
      <el-icon><setting /></el-icon>
      <span>页面2</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { House, Document, Setting } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-menu {
  border-right: none;
}
</style>