<template>
  <div class="ai-algorithm-market-container">
    <h1 class="page-title">AI算法市场</h1>
    <el-row :gutter="20">
      <el-col
        v-for="algorithm in algorithms"
        :key="algorithm.name"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <el-card class="algorithm-card" shadow="hover">
          <div class="algorithm-content">
            <h3 class="algorithm-name">{{ algorithm.name }}</h3>
            <p class="algorithm-description">{{ algorithm.description }}</p>
            <div class="algorithm-details">
              <h4>应用场景</h4>
              <p>{{ algorithm.useCases }}</p>
            </div>
            <div class="algorithm-details">
              <h4>性能特点</h4>
              <p>{{ algorithm.performance }}</p>
            </div>
            <el-button type="primary" class="details-button">查看详情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Mock data for AI vision algorithms
const algorithms = ref([])

function generateMockAlgorithms() {
  algorithms.value = [
    {
      name: 'YOLO (You Only Look Once)',
      description: '实时对象检测算法，单次前向传播即可完成检测，速度快，适合边缘设备。',
      useCases: '自动驾驶（行人、车辆检测）、监控系统（异常行为检测）、零售（客流分析）',
      performance: '高实时性，精度略低于R-CNN，适合资源受限场景，YOLOv11速度达50fps@1080p。'
    },
    {
      name: 'R-CNN (Region-based CNN)',
      description: '基于区域的卷积神经网络，通过区域提议进行对象检测，精度高但计算密集。',
      useCases: '医疗影像（肿瘤检测）、制造业（缺陷检测）、人脸识别',
      performance: '高精度，适合复杂场景，计算资源需求高，推理时间约200ms/图像。'
    },
    {
      name: 'SSD (Single Shot MultiBox Detector)',
      description: '单次检测算法，平衡速度与精度，适合实时应用。',
      useCases: '智能交通（交通标志检测）、安防（入侵检测）、零售（商品识别）',
      performance: '速度快（约60fps@720p），精度适中，适合移动设备。'
    },
    {
      name: 'Mask R-CNN',
      description: '扩展R-CNN，支持实例分割，生成像素级掩码，适合复杂场景。',
      useCases: '自动驾驶（车道分割）、医疗（器官分割）、农业（作物检测）',
      performance: '高精度分割，推理时间约300ms/图像，需高性能GPU。'
    },
    {
      name: 'EfficientDet',
      description: '高效对象检测模型，优化计算效率与精度，适合资源受限设备。',
      useCases: '物联网设备（环境监控）、零售（库存管理）、安防（行为分析）',
      performance: '高效，精度与YOLO相当，推理时间约100ms/图像，低功耗。'
    }
  ]
}

// Initialize data on mount
onMounted(() => {
  generateMockAlgorithms()
})
</script>

<style lang="scss" scoped>
@use 'sass:color';

$primary-color: #3b82f6;
$secondary-color: #1e293b;
$background-color: #f1f5f9;

.ai-algorithm-market-container {
  padding: 20px;
  background-color: $background-color;
  min-height: 100%;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: $secondary-color;
  margin-bottom: 20px;
  text-align: center;
}

.algorithm-card {
  border-radius: 8px;
  background: linear-gradient(135deg, #ffffff, color.adjust($background-color, $lightness: -2%));
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
}

.algorithm-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
}

.algorithm-name {
  font-size: 18px;
  font-weight: 600;
  color: $secondary-color;
  margin: 0;
}

.algorithm-description {
  font-size: 14px;
  color: color.adjust($secondary-color, $lightness: 20%);
  margin: 0;
}

.algorithm-details {
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: $secondary-color;
    margin: 10px 0 5px;
  }
  p {
    font-size: 13px;
    color: color.adjust($secondary-color, $lightness: 10%);
    margin: 0;
  }
}

.details-button {
  margin-top: 10px;
  background-color: $primary-color;
  border-color: $primary-color;
  &:hover {
    background-color: color.adjust($primary-color, $lightness: -10%);
    border-color: color.adjust($primary-color, $lightness: -10%);
  }
}
</style>