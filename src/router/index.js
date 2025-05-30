import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'Index',
      component: () => import('../views/Index.vue'),
      redirect: '/home',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('../views/Home.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/Page1',
          name: 'page1',
          component: Home,
          meta: { requiresAuth: true },
        },
        {
          path: '/Page2',
          name: 'page2',
          component: Home,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

// 全局前置守卫：检查登录状态
router.beforeEach((to, from, next) => {
  const userStore = useUserStore() // 获取 user store
  const isAuthenticated = !!userStore.token // 检查 user.token 是否存在
  if (to.path !== '/login' && !isAuthenticated) {
    // 未登录且访问的不是 login 页面，重定向到 /login
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    // 已登录且访问 login 页面，重定向到 index
    next('/')
  } else {
    // 其他情况正常跳转
    next()
  }
})

export default router
