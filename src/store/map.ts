import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Position } from '../composables/usePosition'

export enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

export type Map = MapTile[][]

export const useMapStore = defineStore('map', () => {
  const map = reactive<Map>([])

  function setupMap(newMap: Map) {
    map.splice(0, map.length, ...newMap)
  }

  function isWall(position: Position) {
    return map[position.y][position.x] === MapTile.WALL
  }

  return {
    map,
    setupMap,
    isWall,
  }
})
