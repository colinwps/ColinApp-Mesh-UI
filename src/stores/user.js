// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '', // JWT访问令牌
    refreshToken: '', // 刷新令牌
    tokenExpire: 0, // 过期时间戳（可选）
    userId: '',
    username: '',
    role: '',
    avatar: '',
  }),

  actions: {
    // 登录成功时设置用户信息
    setUserInfo(payload) {
      this.token = payload.token
      this.refreshToken = payload.refreshToken || ''
      this.tokenExpire = payload.tokenExpire || 0

      this.userId = payload.userId
      this.username = payload.username
      this.role = payload.role
      this.avatar = payload.avatar || ''
    },

    // 更新 access token（如刷新成功后）
    updateToken(newToken, expireTime) {
      this.token = newToken
      this.tokenExpire = expireTime || 0
    },

    // 退出登录或 token 失效
    clearUserInfo() {
      this.token = ''
      this.refreshToken = ''
      this.tokenExpire = 0
      this.userId = ''
      this.username = ''
      this.role = ''
      this.avatar = ''
      this.email = ''
    },
  },

  // ✅ 启用持久化，默认保存到 localStorage
  persist: {
    paths: [
      'token',
      'refreshToken',
      'tokenExpire',
      'userId',
      'username',
      'role',
      'avatar',
      'email',
    ],
  },
})
