<template>
  <div class="login-page">
    <div class="tech-particles" ref="particlesContainer"></div>
    <div class="login-container">
      <h1 class="title">
        OmniMind OS <br />
        全智平台
      </h1>
      <div class="subtitle">AI + Everything</div>
      <el-form :model="form" :rules="rules" ref="formRef" @submit.prevent="submitForm">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="Username" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Password"
            prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Login</el-button>
        </el-form-item>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      </el-form>
      <div class="copyright">@Colin App 2025</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: 'Please enter username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please enter password', trigger: 'blur' }],
}

const formRef = ref(null)
const errorMessage = ref('')

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (form.username === 'admin' && form.password === '123456') {
        ElMessage.success('Login successful!')
        errorMessage.value = ''
        localStorage.setItem('isAuthenticated', 'true')
        router.push('/home')
      } else {
        errorMessage.value = 'Invalid username or password'
      }
    }
  })
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
.login-page {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(13, 27, 42, 0.65), rgba(27, 38, 59, 0.65)),
    url('@/assets/background.webp') no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}

.login-container {
  width: 450px;
  padding: 50px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 1.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.el-input :deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 221, 235, 0.2);
  transition: box-shadow 0.3s;
}

.el-input :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 12px rgba(0, 221, 235, 0.4);
}

.el-input :deep(.el-input__inner) {
  color: #ffffff;
}

.el-button {
  width: 100%;
  background: linear-gradient(45deg, #00ddeb, #ff4081);
  border: none;
  height: 48px;
  font-size: 16px;
  border-radius: 10px;
  transition: all 0.3s;
}

.el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 221, 235, 0.5);
}

.error-message {
  color: #ff5252;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.copyright {
  margin-top: 25px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  text-align: center;
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