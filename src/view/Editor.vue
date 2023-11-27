<script setup lang="ts">
import EditElementView from '@/components/edit/EditElementView.vue'
import EditPlayer from '@/components/edit/EditPlayer.vue'
import MapEdit from '@/components/edit/MapEdit.vue'
</script>

<template>
  <div class="flex">
    <div class="w-4/6 bg-pink-400">
      <MapEdit />
      <EditPlayer />
    </div>
    <div>数据展示区</div>
  </div>
  <div>
    <EditElementView />
  </div>
</template>

<style scoped>

</style>
