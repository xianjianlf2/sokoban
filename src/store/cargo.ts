import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Position } from '../composables/usePosition'
import { useMapStore } from './map'

export interface Cargo {
  x: number
  y: number
}

export const useCargoStore = defineStore('cargo', () => {
  const cargos: Cargo[] = reactive([])

  function createCargo({ x, y }: Position): Cargo {
    return {
      x,
      y,
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
    return true
  }

  return {
    cargos,
    createCargo,
    addCargo,
    findCargo,
    moveCargo,
  }
})
