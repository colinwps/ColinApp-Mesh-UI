<script setup>
import { onMounted } from 'vue'

// Set the page title
onMounted(() => {
  document.title = 'OmniMind OS By Colin App'
})
</script>

<template>
  <router-view />
  <!--
  <div class="app-container">
    <router-view />
  </div>
  -->
</template>

<style scoped>
.app-container {
  margin: 0;
  padding: 0;
  width: 100vh;
  height: 100vh;
}
</style>
