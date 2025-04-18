<script setup>
import { onMounted } from 'vue'

// Set the page title
onMounted(() => {
  document.title = 'OmniMind OS By Colin App'
})
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
#app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: auto;
}
</style>
