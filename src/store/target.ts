import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Position } from '../composables/usePosition'

interface Target {
  x: number
  y: number
}

export const useTargetStore = defineStore('target', () => {
  const targets = reactive<Target[]>([
    {
      x: 3,
      y: 4,
    },
    {
      x: 5,
      y: 4,
    },
  ])

  function addTarget(target: Target) {
    targets.push(target)
  }

  function createTarget({ x, y }: { x: number; y: number }): Target {
    return { x, y }
  }

  function findTarget(pos: Position) {
    return targets.find(t => t.x === pos.x && t.y === pos.y)
  }

  return { targets, addTarget, createTarget, findTarget }
})
