import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Position } from '../composables/usePosition'

interface Target {
  x: number
  y: number
}

export const useTargetStore = defineStore('target', () => {
  const targets = reactive<Target[]>([])

  function addTarget(target: Target) {
    targets.push(target)
  }

  function createTarget({ x, y }: { x: number; y: number }): Target {
    return { x, y }
  }

  function findTarget(pos: Position) {
    return targets.find(t => t.x === pos.x && t.y === pos.y)
  }

  function cleanAllTargets() {
    targets.splice(0, targets.length)
  }

  return { targets, addTarget, createTarget, findTarget, cleanAllTargets }
})
