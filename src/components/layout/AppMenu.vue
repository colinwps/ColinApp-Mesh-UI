<template>
  <el-menu :collapse="collapse" router>
    <el-menu-item index="/home"
      ><el-icon><House /></el-icon>首页</el-menu-item
    >
    <el-menu-item index="/page1"
      ><el-icon><Document /></el-icon>页面一</el-menu-item
    >
    <el-menu-item index="/page2"
      ><el-icon><Setting /></el-icon>页面二</el-menu-item
    >
  </el-menu>
</template>
<script setup>
import { House, Document, Setting } from '@element-plus/icons-vue'
defineProps({ collapse: Boolean })
</script>