import 'normalize.css'
import './assets/main.css'

import { createApp } from 'vue'
//import { createPinia } from 'pinia'
//import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import { pinia } from './stores'

import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'

const messages = {
  en,
  zh,
}

const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)

app.use(ElementPlus)

//const pinia = createPinia()
//pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.use(pinia)

app.use(router)

app.use(i18n)

app.mount('#app')
