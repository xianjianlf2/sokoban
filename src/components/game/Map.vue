<script setup lang="ts">
import floorImg from '../../assets/floor.png'
import wallImg from '../../assets/wall.png'
import { MapTile, useMapStore } from '../../store/map'

const { map } = useMapStore()
</script>

<template>
  <div>
    <div v-for="(_row, i) in map" :key="i" class="flex">
      <div v-for="(_col, j) in map[i]" :key="j">
        <template v-if="map[i][j] === MapTile.WALL">
          <img :src="wallImg">
        </template>
        <template v-else-if="map[i][j] === MapTile.FLOOR">
          <img :src="floorImg">
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
