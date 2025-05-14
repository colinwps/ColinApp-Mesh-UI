<template>
  <div class="not-found-container">
    <el-container>
      <el-main>
        <div class="content">
          <h1 class="error-code">404</h1>
          <h2 class="error-message">页面未找到</h2>
          <p class="description">抱歉，您访问的页面不存在或已被删除。</p>
          <el-button type="primary" size="large" @click="goHome">
            <el-icon><House /></el-icon> 返回首页
          </el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { House } from '@element-plus/icons-vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.el-container {
  width: 100%;
  height: 100%;
}

.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  text-align: center;
  padding: 20px;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  color: #409eff;
  margin: 0;
  line-height: 1;
}

.error-message {
  font-size: 36px;
  color: #303133;
  margin: 20px 0;
}

.description {
  font-size: 16px;
  color: #606266;
  margin-bottom: 30px;
}

.el-button {
  padding: 12px 24px;
  font-size: 16px;
}
</style>