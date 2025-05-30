<template>
  <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTab">
    <el-tab-pane
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      :label="tab.label"
      :closable="tab.name !== '/home'"
    >
      <component :is="tab.component" />
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const tabs = ref([{ name: '/home', label: '首页', component: () => import('@/views/Home.vue') }])
const activeTab = ref('/home')

const route = useRoute()
const router = useRouter()

watch(
  () => route.path,
  async (newPath) => {
    activeTab.value = newPath
    if (!tabs.value.find((tab) => tab.name === newPath)) {
      let component
      if (newPath === '/page1') component = () => import('@/views/Page1.vue')
      else if (newPath === '/page2') component = () => import('@/views/Page2.vue')
      else return
      tabs.value.push({ name: newPath, label: route.meta.title, component })
    }
  },
  { immediate: true }
)

const removeTab = (name) => {
  const index = tabs.value.findIndex((tab) => tab.name === name)
  if (index !== -1) {
    tabs.value.splice(index, 1)
    if (activeTab.value === name) {
      const next = tabs.value[Math.max(0, index - 1)]
      activeTab.value = next.name
      router.push(next.name)
    }
  }
}
</script>