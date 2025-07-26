<template>
  <div class="monitoring-preview-container">
    <h1 class="page-title">监控预览</h1>
    <el-tabs v-model="activeView" type="border-card">
      <!-- Live View Tab -->
      <el-tab-pane label="实时监控" name="live">
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="video-grid">
              <el-select v-model="gridLayout" placeholder="选择布局" style="margin-bottom: 20px">
                <el-option label="1x1" value="1x1" />
                <el-option label="2x2" value="2x2" />
                <el-option label="3x3" value="3x3" />
              </el-select>
              <div :class="`grid-${gridLayout}`">
                <div v-for="camera in cameras" :key="camera.id" class="video-feed">
                  <img
                    :src="camera.liveUrl"
                    alt="Camera Feed"
                    class="video-placeholder"
                    @error="handleImageError"
                  />
                  <div class="camera-info">{{ camera.name }}</div>
                  <div class="ptz-controls" v-if="camera.ptz">
                    <el-button size="small" @click="ptzControl(camera.id, 'zoomIn')">放大</el-button>
                    <el-button size="small" @click="ptzControl(camera.id, 'zoomOut')">缩小</el-button>
                    <el-button size="small" @click="ptzControl(camera.id, 'panLeft')">左移</el-button>
                    <el-button size="small" @click="ptzControl(camera.id, 'panRight')">右移</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <el-card class="event-log">
              <template #header>
                <div class="card-header">事件通知</div>
              </template>
              <el-table :data="events" style="width: 100%" height="400">
                <el-table-column prop="time" label="时间" width="150" />
                <el-table-column prop="camera" label="摄像头" />
                <el-table-column prop="event" label="事件" />
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- Playback Tab -->
      <el-tab-pane label="回放" name="playback">
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="playback-container">
              <el-date-picker
                v-model="playbackDate"
                type="datetime"
                placeholder="选择回放时间"
                style="margin-bottom: 20px"
              />
              <el-select v-model="selectedCamera" placeholder="选择摄像头" style="margin-bottom: 20px; margin-left: 10px">
                <el-option v-for="camera in cameras" :key="camera.id" :label="camera.name" :value="camera.id" />
              </el-select>
              <div class="video-playback">
                <img
                  :src="getPlaybackUrl(selectedCamera)"
                  alt="Playback Feed"
                  class="video-placeholder"
                  @error="handleImageError"
                />
              </div>
              <div class="timeline">
                <el-slider v-model="playbackTime" :max="24 * 60" :format-tooltip="formatTime" />
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <el-card class="bookmark-card">
              <template #header>
                <div class="card-header">书签</div>
              </template>
              <el-button type="primary" size="small" @click="addBookmark">添加书签</el-button>
              <el-table :data="bookmarks" style="width: 100%" height="350">
                <el-table-column prop="time" label="时间" width="150" />
                <el-table-column prop="camera" label="摄像头" />
                <el-table-column prop="description" label="描述" />
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- E-Map Tab -->
      <el-tab-pane label="电子地图" name="emap">
        <div class="emap-container">
          <img src="https://via.placeholder.com/800x400?text=E-Map" alt="E-Map" class="emap-image" />
          <div v-for="camera in cameras" :key="camera.id" class="camera-marker" :style="camera.mapPosition">
            <el-tooltip :content="camera.name">
              <el-icon @click="selectCameraFromMap(camera.id)"><VideoCamera /></el-icon>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// Reactive state
const activeView = ref('live')
const gridLayout = ref('2x2')
const cameras = ref([])
const events = ref([])
const playbackDate = ref(new Date())
const selectedCamera = ref(null)
const playbackTime = ref(0)
const bookmarks = ref([])

// Mock camera data
function generateMockCameras() {
  cameras.value = [
    {
      id: 1,
      name: '入口摄像头',
      liveUrl: 'https://via.placeholder.com/320x180?text=Camera+1',
      playbackUrl: 'https://via.placeholder.com/320x180?text=Playback+Camera+1',
      ptz: true,
      mapPosition: { top: '20%', left: '30%' },
    },
    {
      id: 2,
      name: '大厅摄像头',
      liveUrl: 'https://via.placeholder.com/320x180?text=Camera+2',
      playbackUrl: 'https://via.placeholder.com/320x180?text=Playback+Camera+2',
      ptz: false,
      mapPosition: { top: '40%', left: '50%' },
    },
    {
      id: 3,
      name: '停车场摄像头',
      liveUrl: 'https://via.placeholder.com/320x180?text=Camera+3',
      playbackUrl: 'https://via.placeholder.com/320x180?text=Playback+Camera+3',
      ptz: true,
      mapPosition: { top: '60%', left: '20%' },
    },
    {
      id: 4,
      name: '后门摄像头',
      liveUrl: 'https://via.placeholder.com/320x180?text=Camera+4',
      playbackUrl: 'https://via.placeholder.com/320x180?text=Playback+Camera+4',
      ptz: false,
      mapPosition: { top: '80%', left: '70%' },
    },
  ]
}

// Mock event data
function generateMockEvents() {
  const eventTypes = ['运动检测', '入侵警报', '异常行为']
  events.value = Array.from({ length: 5 }, (_, index) => ({
    time: new Date(Date.now() - Math.random() * 3600000).toLocaleString(),
    camera: cameras.value[Math.floor(Math.random() * cameras.value.length)]?.name || '未知',
    event: eventTypes[Math.floor(Math.random() * eventTypes.length)],
  }))
}

// Initialize data
onMounted(() => {
  generateMockCameras()
  generateMockEvents()
  selectedCamera.value = cameras.value[0]?.id
})

// PTZ control simulation
function ptzControl(cameraId, action) {
  ElMessage.success(`摄像头 ${cameraId} 执行 ${action} 操作`)
}

// Playback URL
function getPlaybackUrl(cameraId) {
  const camera = cameras.value.find((c) => c.id === cameraId)
  return camera?.playbackUrl || 'https://via.placeholder.com/320x180?text=No+Playback'
}

// Format timeline tooltip
function formatTime(value) {
  const hours = Math.floor(value / 60)
  const minutes = value % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

// Add bookmark
function addBookmark() {
  const camera = cameras.value.find((c) => c.id === selectedCamera.value)
  bookmarks.value.push({
    time: playbackDate.value.toLocaleString(),
    camera: camera?.name || '未知',
    description: `书签 ${bookmarks.value.length + 1}`,
  })
  ElMessage.success('书签添加成功')
}

// Select camera from e-map
function selectCameraFromMap(cameraId) {
  selectedCamera.value = cameraId
  activeView.value = 'live'
  ElMessage.success(`已选择摄像头 ${cameraId}`)
}

// Handle image load errors
function handleImageError(event) {
  event.target.src = 'https://via.placeholder.com/320x180?text=Camera+Offline'
}
</script>

<style lang="scss" scoped>
@use 'sass:color';

$primary-color: #3b82f6;
$secondary-color: #1e293b;
$background-color: #f1f5f9;

.monitoring-preview-container {
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

.video-grid {
  .grid-1x1 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .grid-2x2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .grid-3x3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .video-feed {
    position: relative;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
  }
  .video-placeholder {
    width: 100%;
    height: auto;
    display: block;
  }
  .camera-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 5px;
    text-align: center;
  }
  .ptz-controls {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 5px;
  }
}

.playback-container {
  .video-playback {
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .timeline {
    margin-top: 10px;
  }
}

.emap-container {
  position: relative;
  .emap-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  .camera-marker {
    position: absolute;
    cursor: pointer;
    color: $primary-color;
    font-size: 24px;
  }
}

.event-log, .bookmark-card {
  background: linear-gradient(135deg, #ffffff, color.adjust($background-color, $lightness: -2%));
  .card-header {
    font-weight: 600;
    color: $secondary-color;
  }
}

.el-button--primary {
  background-color: $primary-color;
  border-color: $primary-color;
  &:hover {
    background-color: color.adjust($primary-color, $lightness: -10%);
    border-color: color.adjust($primary-color, $lightness: -10%);
  }
}
</style>