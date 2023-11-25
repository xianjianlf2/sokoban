<script setup lang="ts">
import { toRefs, watchEffect } from 'vue'
import { floorEditElement, wallEditElement } from '@/store/edit/editElement'
import { useMapEditStore } from '@/store/edit/mapEdit'

const { initMap, updateMapRow } = useMapEditStore()
const { row, col } = toRefs(useMapEditStore())

initMap()

watchEffect(() => {
  updateMapRow()
})
</script>

<template>
  <div>
    <h3>元素选择区</h3>
    <div class="m-2 space-y-2">
      <div>
        row: <input v-model="row" type="text" class="border border-blue-50">
      </div>
      <div>
        col: <input v-model="col" type="text" class="border border-blue-50">
      </div>
    </div>
    <div class="flex space-x-2 m-2">
      <h4>地图</h4>

      <EditElementView :edit-element="wallEditElement" />
      <EditElementView :edit-element="floorEditElement" />
    </div>
  </div>
</template>

<style scoped></style>
