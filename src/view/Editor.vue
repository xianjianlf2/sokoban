<script setup lang="ts">
import EditElementView from '@/components/edit/EditElementView.vue'
import MapEdit from '@/components/edit/MapEdit.vue'
</script>

<template>
  <div class="flex">
    <div class="w-4/6 bg-pink-400">
      <MapEdit />
    </div>
    <div>数据展示区</div>
  </div>
  <div>
    <EditElementView />
  </div>
</template>

<style scoped>

</style>
