<template>
  <div class="header">
    <div class="left">
      <img src="" alt="Logo" class="logo" />
      <span class="system-name">后台管理系统</span>
    </div>
    <div class="right">
      <el-badge :value="3" class="item">
        <el-button type="primary" circle>
          <el-icon><bell /></el-icon>
        </el-button>
      </el-badge>
      <el-dropdown>
        <span class="user-name">admin</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Bell } from '@element-plus/icons-vue'
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.left {
  display: flex;
  align-items: center;
}
.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.system-name {
  font-size: 18px;
  font-weight: bold;
}
.right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.user-name {
  cursor: pointer;
}
.item {
  margin-right: 10px;
}
</style>