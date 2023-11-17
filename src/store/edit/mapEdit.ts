import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useEditStore = defineStore('map-edit', () => {
  const map = reactive(
    [
      [2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2],
    ],
  )

  return {
    map,
  }
})
