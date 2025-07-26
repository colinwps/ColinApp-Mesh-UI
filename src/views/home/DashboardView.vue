<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">监控仪表盘</h1>
    <el-row :gutter="20">
      <!-- Monitoring Count -->
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <el-card class="metric-card" shadow="hover">
          <div class="metric-content">
            <el-icon class="metric-icon"><VideoCamera /></el-icon>
            <div class="metric-info">
              <span class="metric-label">监控数量</span>
              <span class="metric-value">{{ monitoringCount }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- Online Count -->
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <el-card class="metric-card" shadow="hover">
          <div class="metric-content">
            <el-icon class="metric-icon"><CircleCheck /></el-icon>
            <div class="metric-info">
              <span class="metric-label">在线数量</span>
              <span class="metric-value">{{ onlineCount }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- Offline Count -->
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <el-card class="metric-card" shadow="hover">
          <div class="metric-content">
            <el-icon class="metric-icon"><CircleClose /></el-icon>
            <div class="metric-info">
              <span class="metric-label">离线数量</span>
              <span class="metric-value">{{ offlineCount }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- AI Events Section -->
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <el-card class="metric-card ai-events" shadow="hover">
          <div class="metric-content">
            <el-icon class="metric-icon"><Cpu /></el-icon>
            <div class="metric-info">
              <span class="metric-label">AI 事件</span>
              <div class="ai-event-list">
                <div class="ai-event-item">
                  <el-icon><Helmet /></el-icon>
                  <span>安全帽未佩戴: {{ aiEvents.helmet }}</span>
                </div>
                <div class="ai-event-item">
                  <el-icon><UserFilled /></el-icon>
                  <span>未穿工衣: {{ aiEvents.uniform }}</span>
                </div>
                <div class="ai-event-item">
                  <el-icon><Smoking /></el-icon>
                  <span>吸烟检测: {{ aiEvents.smoking }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VideoCamera, CircleCheck, CircleClose, Cpu } from '@element-plus/icons-vue'

// Reactive state for metrics
const monitoringCount = ref(0)
const onlineCount = ref(0)
const offlineCount = ref(0)
const aiEvents = ref({
  helmet: 0,
  uniform: 0,
  smoking: 0,
})

// Function to generate random values
function generateRandomMetrics() {
  // Total monitoring count: random between 50 and 200
  monitoringCount.value = Math.floor(Math.random() * (200 - 50 + 1)) + 50
  // Online count: random between 60% and 90% of monitoring count
  const onlinePercentage = Math.random() * (0.9 - 0.6) + 0.6
  onlineCount.value = Math.floor(monitoringCount.value * onlinePercentage)
  // Offline count: remaining devices
  offlineCount.value = monitoringCount.value - onlineCount.value
  // AI events: random between 0 and 30 for each
  aiEvents.value = {
    helmet: Math.floor(Math.random() * 31),
    uniform: Math.floor(Math.random() * 31),
    smoking: Math.floor(Math.random() * 31),
  }
}

// Generate random values on mount
onMounted(() => {
  generateRandomMetrics()
})
</script>

<style lang="scss" scoped>
@use 'sass:color';

$primary-color: #3b82f6; // Primary blue
$secondary-color: #1e293b; // Dark slate
$text-color: #e2e8f0; // Light gray for text
$background-color: #f1f5f9; // Light background

.dashboard-container {
  padding: 20px;
  background-color: $background-color;
  min-height: 100%;
}

.dashboard-title {
  font-size: 24px;
  font-weight: 600;
  color: $secondary-color;
  margin-bottom: 20px;
  text-align: center;
}

.metric-card {
  border-radius: 8px;
  background: linear-gradient(135deg, #ffffff, color.adjust($background-color, $lightness: -2%));
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
}

.metric-content {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
}

.metric-icon {
  font-size: 40px;
  color: $primary-color;
}

.metric-info {
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 16px;
  color: color.adjust($secondary-color, $lightness: 20%);
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  color: $secondary-color;
}

.ai-events {
  .metric-info {
    width: 100%;
  }
  .ai-event-list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ai-event-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: color.adjust($secondary-color, $lightness: 10%);
    .el-icon {
      font-size: 18px;
      color: $primary-color;
    }
  }
}
</style>