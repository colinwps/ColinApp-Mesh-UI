<template>
  <el-container style="height: 100vh; width: 100vw">
    <!-- Sidebar -->
    <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
      <el-scrollbar style="height: 100%">
        <!-- Logo -->
        <div class="logo" v-if="!isCollapse">
          <img src="@/assets/logo.png" alt="Logo" style="width: 50%; height: auto; margin: 15px 0" />
        </div>

        <!-- Menu -->
        <el-menu
          :default-active="activeMenu"
          class="colinapp-menu"
          :collapse="isCollapse"
          @select="handleMenuSelect"
          background-color="#1e293b"
          text-color="#e2e8f0"
          active-text-color="#3b82f6"
        >
          <template v-for="item in list" :key="item.name">
            <!-- Submenu for items with children -->
            <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.name">
              <template #title>
                <el-icon>
                  <component :is="icons[item.ico]" />
                </el-icon>
                <span>{{ item.label }}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.name"
                :index="child.name"
              >
                <el-icon>
                  <component :is="icons[child.ico]" />
                </el-icon>
                <span>{{ child.label }}</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- Single menu item for items without children -->
            <el-menu-item v-else :index="item.name">
              <el-icon>
                <component :is="icons[item.ico]" />
              </el-icon>
              <span>{{ item.label }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <!-- Main layout -->
    <el-container style="width: auto">
      <!-- Header -->
      <el-header class="header">
        <div class="left">
          <el-icon @click="toggleCollapse" style="cursor: pointer; color: #ffffff">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <span class="system-name">AI 视频监控平台</span>
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
      <el-main style="background-color: #f1f5f9">
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
import { ref, onMounted } from 'vue'
import { HomeFilled, Folder, Document, Delete, Memo, Setting, User, Expand, Fold, ArrowDown, UserFilled, VideoCamera, Platform } from '@element-plus/icons-vue'
import DashboardView from '@/views/home/DashboardView.vue' // Adjust path as needed

import UserManagementView from '@/views/organization/UserManagementView.vue'

import MonitoringPreviewView from '@/views/monitoring/MonitoringPreviewView.vue'

import AIAlgorithmMarketView from '@/views/ai/AIAlgorithmMarketView.vue'

// Reactive state
const isCollapse = ref(false)
const username = ref('Admin')
const activeMenu = ref('dashboard')
const activeTab = ref('dashboard')
const tabs = ref([{ name: 'dashboard', label: 'Dashboard', component: DashboardView }])

// Define icon mapping
const icons = { HomeFilled, Folder, Document, Delete, Memo, Setting, User, UserFilled, VideoCamera, Platform  }

// Menu items
const list = ref([
  {
    name: 'dashboard',
    label: 'Dashboard',
    component: DashboardView, // Use component reference
    ico: 'HomeFilled',
  },
  {
    name: 'user-management',
    label: '用户管理',
    component: UserManagementView,
    ico: 'UserFilled',
  },
  {
    name: 'monitoring-preview',
    label: '监控预览',
    component: MonitoringPreviewView,
    ico: 'VideoCamera',
  },
  {
    name: 'ai-algorithm-market',
    label: 'AI算法市场',
    component: AIAlgorithmMarketView,
    ico: 'Platform',
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

// Set default tab and menu on mount
onMounted(() => {
  activeMenu.value = 'dashboard'
  activeTab.value = 'dashboard'
  const exists = tabs.value.find((tab) => tab.name === 'dashboard')
  if (!exists) {
    tabs.value.push({
      name: 'dashboard',
      label: 'Dashboard',
      component: DashboardView,
    })
  }
})

function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}

function handleMenuSelect(index) {
  activeMenu.value = index
  const exists = tabs.value.find((tab) => tab.name === index)
  if (!exists) {
    let selectedItem = list.value.find((item) => item.name === index)
    if (!selectedItem) {
      for (const item of list.value) {
        if (item.children) {
          selectedItem = item.children.find((child) => child.name === index)
          if (selectedItem) break
        }
      }
    }
    if (selectedItem) {
      tabs.value.push({
        name: index,
        label: selectedItem.label,
        component: selectedItem.component,
      })
    }
  }
  activeTab.value = index
}

function removeTab(targetName) {
  if (targetName === 'dashboard') return
  const index = tabs.value.findIndex((tab) => tab.name === targetName)
  tabs.value.splice(index, 1)
  if (activeTab.value === targetName && tabs.value.length > 0) {
    activeTab.value = tabs.value[0].name
  }
}

function logout() {
  console.log('Logout clicked')
}
</script>

<style lang="scss" scoped>
@use 'sass:color';

$primary-color: #3b82f6;
$secondary-color: #1e293b;
$text-color: #e2e8f0;
$background-color: #f1f5f9;
$header-color: #1e40af;

.sidebar {
  background-color: $secondary-color;
  transition: width 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  background-color: color.adjust($secondary-color, $lightness: -5%);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $header-color;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 0 20px;
  color: #ffffff;
}

.header .left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header .system-name {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
}

.header .right {
  font-size: 14px;
  .el-dropdown-link {
    color: #ffffff;
    cursor: pointer;
    &:hover {
      color: $primary-color;
    }
  }
}

.el-main {
  background-color: $background-color;
  padding: 20px;
}

.colinapp-menu {
  border-right: none;
  .el-menu-item.is-active {
    background-color: color.adjust($secondary-color, $lightness: 10%);
    border-left: 3px solid $primary-color;
  }
  .el-menu-item:hover {
    background-color: color.adjust($secondary-color, $lightness: 5%);
  }
  .el-sub-menu__title:hover {
    background-color: color.adjust($secondary-color, $lightness: 5%);
  }
}
</style>