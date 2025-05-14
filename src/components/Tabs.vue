<template>
  <el-tabs
    v-model="activeTab"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="handleTabClick"
  >
    <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.title" :name="tab.name" />
  </el-tabs>
</template>

<script setup>
import { useTabStore } from '@/stores'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const tabStore = useTabStore()
const router = useRouter()

const tabs = computed(() => tabStore.tabs)
const activeTab = computed({
  get: () => tabStore.activeTab,
  set: (value) => (tabStore.activeTab = value),
})

const removeTab = (tabName) => {
  tabStore.removeTab(tabName)
  if (tabStore.tabs.length) {
    router.push(tabStore.tabs[tabStore.tabs.length - 1].path)
  }
}

const handleTabClick = (tab) => {
  const targetTab = tabs.value.find((t) => t.name === tab.props.name)
  if (targetTab) {
    router.push(targetTab.path)
  }
}

router.afterEach((to) => {
  if (to.name) {
    tabStore.addTab(to)
  }
})
</script>

<style scoped>
.el-tabs {
  background-color: #fff;
  padding: 10px;
}
</style>