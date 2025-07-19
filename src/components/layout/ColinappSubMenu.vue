<template>
  <template v-if="item.children && item.children.length">
    <el-sub-menu :index="item.name">
      <template #title>
        <el-icon v-if="item.ico">
          <component :is="item.ico" />
        </el-icon>
        <span>{{ item.label }}</span>
      </template>
      <menu-item v-for="child in item.children" :key="child.name" :item="child" />
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="item.name">
      <el-icon v-if="item.ico">
        <component :is="item.ico" />
      </el-icon>
      <span>{{ item.label }}</span>
    </el-menu-item>
  </template>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>