<script setup lang="ts">
import { toRefs, watchEffect } from 'vue'
import { floorEditElement, playerEditElement, wallEditElement } from '@/store/edit/editElement'
import { useMapEditStore } from '@/store/edit/mapEdit'

const { initMap, updateMapRow, updateMapCol } = useMapEditStore()
const { row, col } = toRefs(useMapEditStore())

initMap()

watchEffect(() => {
  if (!row.value)
    return
  updateMapRow()
})

watchEffect(() => {
  if (!col.value)
    return
  updateMapCol()
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
    <div class="flex">
      <h4>玩家：</h4>
      <EditElementView :edit-element="playerEditElement" />
    </div>
  </div>
</template>

<style scoped></style>
