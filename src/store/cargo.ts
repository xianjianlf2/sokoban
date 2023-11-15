import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Position } from '../composables/usePosition'
import { useMapStore } from './map'
import { useTargetStore } from './target'

let Id = 1
export interface Cargo {
  id: number
  x: number
  y: number
  onTarget: boolean
}

export const useCargoStore = defineStore('cargo', () => {
  const cargos: Cargo[] = reactive([])

  function createCargo({ x, y }: Position): Cargo {
    return {
      id: Id++,
      x,
      y,
      onTarget: false,
    }
  }
  function addCargo(cargo: Cargo) {
    cargos.push(cargo)
  }

  function findCargo(position: Position) {
    return cargos.find(c => c.x === position.x && c.y === position.y)
  }

  function moveCargo(cargo: Cargo, dx: number, dy: number) {
    const { isWall } = useMapStore()
    const newCargoPosition = { x: cargo.x + dx, y: cargo.y + dy }

    if (isWall(newCargoPosition) || findCargo(newCargoPosition))
      return false

    cargo.x += dx
    cargo.y += dy

    detectionTarget(cargo)

    return true
  }
  function detectionTarget(cargo: Cargo) {
    const { findTarget } = useTargetStore()
    cargo.onTarget = !!findTarget(cargo)
  }

  function cleanAllCargos() {
    cargos.splice(0, cargos.length)
  }

  return {
    cargos,
    createCargo,
    addCargo,
    findCargo,
    moveCargo,
    cleanAllCargos,
  }
})
