import axios from 'axios'
import { useUserStore } from '@/stores/user.js'
import router from '@/router'

let isRefreshing = false
let requestQueue = []

const whiteList = ['/Account/login', '/Account/captcha', '/refresh']

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8801/api', // Replace with your backend API URL
  timeout: 10000,
})

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (!whiteList.includes(config.url)) {
      if (userStore.token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor for handling errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const userStore = useUserStore()
    const originalRequest = error.config

    // token 过期，尝试刷新
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!userStore.refreshToken) {
        userStore.logout()
        router.push('/login')
        return Promise.reject('未登录')
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          requestQueue.push(() => {
            originalRequest.headers.Authorization = `Bearer ${userStore.token}`
            resolve(request(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const res = await axios.post('/refresh', {
          refreshToken: userStore.refreshToken,
        })

        userStore.updateToken(res.data.accessToken, res.data.ExpiresIn)

        requestQueue.forEach((cb) => cb())
        requestQueue = []
        isRefreshing = false

        originalRequest.headers.Authorization = `Bearer ${res.token}`
        return request(originalRequest)
      } catch (refreshErr) {
        isRefreshing = false
        userStore.logout()
        router.push('/login')
        return Promise.reject('刷新token失败，请重新登录')
      }
    }

    return Promise.reject(error.response?.data || error.message)
  },
)

export default api
