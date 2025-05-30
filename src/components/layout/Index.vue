<template>
  <el-container style="height: 100vh">
    <AppHeader @toggleMenu="isCollapse = !isCollapse" />
    <el-container>
      <el-aside width="200px">
        <AppMenu :collapse="isCollapse" />
      </el-aside>
      <el-main>
        <TabView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './AppHeader.vue'
import AppMenu from './AppMenu.vue'
import TabView from './TabView.vue'

const isCollapse = ref(false)
</script>