import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8801/api', // Replace with your backend API URL
  timeout: 10000,
})

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor for handling errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('isAuthenticated')
      window.location.href = '/'
    }
    return Promise.reject(error)
  },
)

export default api
