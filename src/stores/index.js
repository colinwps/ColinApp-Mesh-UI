import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const useTabStore = defineStore('tabs', {
  state: () => ({
    tabs: [{ name: 'Home', title: '主页', path: '/home' }],
    activeTab: 'Home',
  }),
  actions: {
    addTab(route) {
      if (!this.tabs.find((tab) => tab.name === route.name)) {
        this.tabs.push({
          name: route.name,
          title: route.meta.title,
          path: route.path,
        })
      }
      this.activeTab = route.name
    },
    removeTab(tabName) {
      const index = this.tabs.findIndex((tab) => tab.name === tabName)
      if (index !== -1) {
        this.tabs.splice(index, 1)
        if (this.activeTab === tabName && this.tabs.length) {
          this.activeTab = this.tabs[Math.min(index, this.tabs.length - 1)].name
        }
      }
    },
  },
  persist: {
    storage: localStorage,
  },
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export { pinia }
