<template>
  <div class="layout-container">
    <!-- 顶部导航 -->
    <el-header class="header">
      <div class="logo">Tech Dashboard</div>
      <div class="user-info">
        <el-dropdown>
          <span class="user-name">
            <el-icon><User /></el-icon>
            {{ userInfo.name }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-container class="main-container">
      <!-- 左侧菜单 -->
      <el-aside :width="isCollapsed ? '60px' : '220px'" class="aside">
        <div class="collapse-btn" @click="toggleCollapse">
          <el-icon :size="20" color="#ffffff">
            <component :is="isCollapsed ? 'ArrowRight' : 'ArrowLeft'" />
          </el-icon>
        </div>
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical"
          :collapse="isCollapsed"
          @select="handleMenuSelect"
          background-color="#0f172a"
          text-color="#cbd5e1"
          active-text-color="#38bdf8"
        >
          <el-menu-item v-for="menu in menuList" :key="menu.path" :index="menu.path">
            <el-icon><component :is="menu.icon" /></el-icon>
            <span>{{ menu.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主体内容 -->
      <el-main class="main">
        <el-tabs
          v-model="activeTab"
          type="card"
          closable
          @tab-remove="removeTab"
          @tab-click="handleTabClick"
        >
          <el-tab-pane v-for="tab in tabs" :key="tab.path" :label="tab.name" :name="tab.path">
            <component :is="tab.component" />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import { ElMessage } from 'element-plus'
import { User, HomeFilled, Setting, Document, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const userInfo = ref({ name: 'Admin' })
const isCollapsed = ref(false)
const activeMenu = ref('/home')
const menuList = ref([
  { name: 'Home', path: '/home', icon: HomeFilled },
  { name: '用户管理', path: '/user', icon: User },
  { name: '部门管理', path: '/department', icon: Setting },
  { name: '角色管理', path: '/role', icon: Document },
])
const activeTab = ref('/home')
const tabs = ref([
  {
    name: 'Home',
    path: '/home',
    component: shallowRef({
      template: '<div class="home-content">Welcome to Tech Dashboard!</div>',
    }),
  },
])

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
const handleMenuSelect = (path) => {
  activeMenu.value = path
  const menu = menuList.value.find((m) => m.path === path)
  if (menu && !tabs.value.some((t) => t.path === path)) {
    tabs.value.push({
      name: menu.name,
      path: menu.path,
      component: shallowRef({ template: `<div class='tab-content'>${menu.name} Content</div>` }),
    })
  }
  activeTab.value = path
}
const removeTab = (path) => {
  const index = tabs.value.findIndex((t) => t.path === path)
  if (index > -1) {
    tabs.value.splice(index, 1)
    if (activeTab.value === path) {
      activeTab.value = tabs.value[index - 1]?.path || '/home'
      activeMenu.value = activeTab.value
    }
  }
}
const handleTabClick = (tab) => {
  activeTab.value = tab.props.name
  activeMenu.value = tab.props.name
}
const handleLogout = () => {
  ElMessage.success('已退出登录')
}
</script>

<style scoped>
html,
body,
#app,
.layout-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: #0f172a;
  overflow: hidden;
}

.main-container {
  flex: 1;
  display: flex;
  width: 100%;
}

.el-main.main {
  flex: 1;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 0; /* remove default 20px padding */
  background: #1e293b;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  padding: 0 20px;
  height: 60px;
  color: #f1f5f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.logo {
  font-size: 22px;
  font-weight: 600;
  color: #38bdf8;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  color: #f1f5f9;
  cursor: pointer;
}

.aside {
  background: #0f172a;
  border-right: 1px solid #1e293b;
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
}

.collapse-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 1;
}

.el-menu-vertical {
  height: 100%;
  border-right: none;
}

.main {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #1e293b;
}

.home-content,
.tab-content {
  background: #334155;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 10px;
  min-height: 400px;
}

:deep(.el-tabs__header) {
  background: #1e293b;
  border-radius: 8px 8px 0 0;
}

:deep(.el-tabs__item) {
  color: #e2e8f0;
}

:deep(.el-tabs__item.is-active) {
  background: #38bdf8;
  color: #0f172a;
}
</style>