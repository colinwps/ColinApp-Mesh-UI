<template>
  <el-header height="60px" class="header">
    <div class="left">
      <el-icon @click="$emit('toggleMenu')"><Menu /></el-icon>
      <span class="system-name">My System</span>
    </div>
    <div class="right">
      <el-avatar icon="UserFilled" />
      <span class="username">Admin</span>
    </div>
  </el-header>
</template>
<script setup>
import { Menu, UserFilled } from '@element-plus/icons-vue'
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #409eff;
  color: white;
  padding: 0 20px;
}
.left {
  display: flex;
  align-items: center;
}
.system-name {
  font-size: 18px;
  margin-left: 10px;
}
.right {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>