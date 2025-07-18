<template>
  <el-container style="height: 100vh; width: 100vw">
    <!-- Sidebar -->
    <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
      <el-menu
        :default-active="activeMenu"
        class="colinapp-menu"
        :collapse="isCollapse"
        @select="handleMenuSelect"
      >
        <el-menu-item index="dashboard">
          <el-icon><HomeFilled /></el-icon>
          <span>Dashboard</span>
        </el-menu-item>
        <el-menu-item index="users">
          <el-icon><User /></el-icon>
          <span>Users</span>
        </el-menu-item>
        <el-menu-item index="settings">
          <el-icon><Setting /></el-icon>
          <span>Settings</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- Main layout -->
    <el-container style="width: auto">
      <!-- Header -->
      <el-header class="header">
        <div class="left">
          <el-icon @click="toggleCollapse" style="cursor: pointer">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <span class="system-name">OmniMind OS 系统</span>
        </div>
        <div class="right">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ username }} <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- Tabs and Content -->
      <el-main>
        <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTab">
          <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name">
            <component :is="tab.component" />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { Fold, Expand, HomeFilled, User, Setting, ArrowDown } from '@element-plus/icons-vue'

const isCollapse = ref(false)
const username = 'Admin'
const activeMenu = ref('dashboard')
const activeTab = ref('dashboard')
const tabs = ref([{ name: 'dashboard', label: 'Dashboard', component: 'DashboardView' }])

function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}

function handleMenuSelect(index) {
  activeMenu.value = index
  const exists = tabs.value.find((tab) => tab.name === index)
  if (!exists) {
    tabs.value.push({
      name: index,
      label: index.charAt(0).toUpperCase() + index.slice(1),
      component: index.charAt(0).toUpperCase() + index.slice(1) + 'View',
    })
  }
  activeTab.value = index
}

function removeTab(targetName) {
  const index = tabs.value.findIndex((tab) => tab.name === targetName)
  tabs.value.splice(index, 1)
  if (activeTab.value === targetName && tabs.value.length > 0) {
    activeTab.value = tabs.value[0].name
  }
}

function logout() {
  console.log('Logout clicked')
  // 实际退出逻辑可加 token 清理和页面跳转等
}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #2d3a4b;
  color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
}

.header .left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header .system-name {
  font-size: 18px;
  font-weight: bold;
}

.header .right {
  font-size: 14px;
}
</style>