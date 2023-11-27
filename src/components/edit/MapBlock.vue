<script setup lang="ts">
import { MapTile } from '@/store/map'
import wallImg from '@/assets/wall.png'
import floorImg from '@/assets/floor.png'
import { useMapEditStore } from '@/store/edit/mapEdit'
import { useEditElementStore } from '@/store/edit/editElement'
import { useDrag } from '@/composables/useDrag'

interface Props {
  x: number
  y: number
}

const props = defineProps<Props>()
const { map } = useMapEditStore()
const { getCurrentSelectedEditElement } = useEditElementStore()
const { isDragging, startDrag, stopDrag } = useDrag()

function handleClick() {
  getCurrentSelectedEditElement().execute(props)
}

function handleMouseDown() {
  startDrag()
  window.addEventListener('mouseup', handleMouseUp)
}

function handleMouseUp() {
  stopDrag()
  window.removeEventListener('mouseup', handleMouseUp)
}

function handleMouseMove() {
  if (isDragging())
    getCurrentSelectedEditElement()?.execute(props)
}
</script>

<template>
  <div class="border border-white" @click="handleClick" @mousedown="handleMouseDown" @mousemove="handleMouseMove">
    <template v-if="map[props.y][props.x] === MapTile.WALL">
      <img :src="wallImg" draggable="false">
    </template>
    <template v-else-if="map[props.y][props.x] === MapTile.FLOOR">
      <img :src="floorImg" draggable="false">
    </template>
  </div>
</template>

<style scoped></style>
