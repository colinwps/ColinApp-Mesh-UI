<template>
  <el-container style="height: 100vh; width: 100vw">
    <!-- Sidebar -->
    <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
      <el-scrollbar style="height: 100%">
        <!-- Logo-->
        <div class="logo" v-if="!isCollapse">
          <img src="@/assets/logo.png" alt="Logo" style="width: 50%; height: auto; margin: 5px 0" />
        </div>

        <!-- Menu -->
        <el-menu
          :default-active="activeMenu"
          class="colinapp-menu"
          :collapse="isCollapse"
          @select="handleMenuSelect"
        >
          <el-menu-item v-for="item in list" :key="item.name" :index="item.name">
            <el-icon><HomeFilled /></el-icon>
            <span>{}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
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
// 导入 Element Plus 的图标组件（根据需要动态引入）
import { HomeFilled, Folder, Document, Delete, Memo, Setting, User } from '@element-plus/icons-vue'

const isCollapse = ref(false)
const username = 'Admin'
const activeMenu = ref('dashboard')
const activeTab = ref('dashboard')
const tabs = ref([{ name: 'dashboard', label: 'Dashboard', component: 'DashboardView' }])

// 定义图标映射（可选）
const icons = { HomeFilled, Folder, Document, Delete, Memo, Setting, User }

const list = ref([
  {
    name: 'dashboard',
    label: 'Dashboard',
    component: 'DashboardView',
    ico: 'HomeFilled',
  },
  {
    name: 'projects',
    label: 'Projects',
    component: 'ProjectsView',
    ico: 'Folder',
    children: [
      {
        name: 'all-projects',
        label: 'All Projects',
        component: 'AllProjectsView',
        ico: 'Document',
      },
      {
        name: 'archived',
        label: 'Archived',
        component: 'ArchivedProjectsView',
        ico: 'Delete',
      },
    ],
  },
  {
    name: 'tasks',
    label: 'Tasks',
    component: 'TasksView',
    ico: 'Memo',
  },
  {
    name: 'settings',
    label: 'Settings',
    component: 'SettingsView',
    ico: 'Setting',
  },
  {
    name: 'profile',
    label: 'Profile',
    component: 'ProfileView',
    ico: 'User',
  },
])

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
  background-color: #ffffff;
  color: #ffffff;
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