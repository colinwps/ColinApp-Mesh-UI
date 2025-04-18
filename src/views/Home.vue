<template>
  <div class="home-page">
    <div class="tech-particles" ref="particlesContainer"></div>
    <div class="home-container">
      <h1 class="title">OmniMind OS 全智平台</h1>
      <div class="subtitle">AI + Everything</div>
      <el-row :gutter="20" class="charts-row">
        <el-col :span="12">
          <div class="chart-card">
            <h3 class="chart-title">AI + 视频监控</h3>
            <LineChart :chart-data="lineChartData" :options="chartOptions" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="chart-card">
            <h3 class="chart-title">AI + 物联网设备</h3>
            <PieChart :chart-data="pieChartData" :options="chartOptions" />
          </div>
        </el-col>
      </el-row>
      <div class="copyright">@Colin App 2025</div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { Line as LineChart, Pie as PieChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement
)

const router = useRouter()

const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'System Usage',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: '#00ddeb',
      backgroundColor: 'rgba(0, 221, 235, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
}

const pieChartData = {
  labels: ['CPU', 'Memory', 'Storage', 'Network'],
  datasets: [
    {
      data: [30, 25, 35, 10],
      backgroundColor: ['#00ddeb', '#ff4081', '#8000ff', '#00ff7f'],
      borderColor: '#ffffff',
      borderWidth: 1,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#ffffff',
      },
    },
  },
  scales: {
    x: {
      ticks: { color: '#ffffff' },
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
    },
    y: {
      ticks: { color: '#ffffff' },
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
    },
  },
}

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  ElMessage.success('Logged out successfully!')
  router.push('/')
}

const particlesContainer = ref(null)

const createParticles = () => {
  const container = particlesContainer.value
  const colors = ['rgba(0, 221, 235, 0.3)', 'rgba(255, 64, 129, 0.3)', 'rgba(128, 0, 255, 0.3)']
  for (let i = 0; i < 80; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.width = `${Math.random() * 6 + 3}px`
    particle.style.height = particle.style.width
    particle.style.left = `${Math.random() * 100}%`
    particle.style.background = colors[Math.floor(Math.random() * colors.length)]
    particle.style.animationDelay = `${Math.random() * 12}s`
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`
    container.appendChild(particle)
  }
}

onMounted(() => {
  createParticles()
})
</script>
  
  <style scoped>
.home-page {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(13, 27, 42, 0.65), rgba(27, 38, 59, 0.65)),
    url('@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}

.home-container {
  width: 90%;
  max-width: 1400px;
  height: 80vh;
  padding: 40px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  animation: fadeIn 1.2s ease-in-out;
}

.title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
  background: linear-gradient(45deg, #00ddeb, #ff4081);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(0, 221, 235, 0.5);
  animation: glow 2s ease-in-out infinite alternate;
}

.subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin-bottom: 30px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.charts-row {
  flex: 1;
  overflow-y: auto;
}

.chart-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  height: 300px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(0, 221, 235, 0.2);
  transition: all 0.3s;
}

.chart-card:hover {
  box-shadow: 0 0 20px rgba(0, 221, 235, 0.4);
}

.chart-title {
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.copyright {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin-top: 20px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.tech-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: float 15s infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px rgba(0, 221, 235, 0.5);
  }
  to {
    text-shadow: 0 0 20px rgba(0, 221, 235, 0.8);
  }
}
</style>