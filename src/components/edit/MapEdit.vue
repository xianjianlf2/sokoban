<script setup lang="ts">
import MapBlock from './MapBlock.vue'
import { useMapEditStore } from '@/store/edit/mapEdit'

const { map } = useMapEditStore()
</script>

<template>
  <div>
    <div v-for="(_row, i) in map" :key="i" class="flex">
      <div v-for="(_col, j) in map[i]" :key="j">
        <MapBlock :x="j" :y="i" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
