<template>
  <div id="colinapp-container" :class="colinapp - container">
    <div class="colinapp-aside">
      <div class="header">
        <img v-show="!isCollapsed" src="@/assets/logo.png" alt="Logo" class="logo" />
        <el-icon>
          <DArrowLeft />
        </el-icon>
      </div>

      <div class="colinapp-menu">
        <el-scrollbar style="height: 100%"> </el-scrollbar>
        <ColinAppMenu />
      </div>
    </div>
    <!--右侧显示-->
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import ColinAppMenu from '../components/layout/ColinApp-Menu.vue'
const isCollapsed = ref(false)
</script>

<style lang="scss" scoped>
</style>