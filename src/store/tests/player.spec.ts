import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePlayerStore } from '../player'
import { useMapStore } from '../map'
import { useCargoStore } from '../cargo'

describe('player', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe('normal Move', () => {
    beforeEach(() => {
      // setup
      const { setupMap } = useMapStore()
      setupMap([
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ])
    })
    it('should move to left', () => {
      const { movePlayerToLeft, player } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToLeft()

      expect(player.x).toBe(0)
    })
    it('should move to right', () => {
      const { movePlayerToRight, player } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToRight()

      expect(player.x).toBe(2)
    })
    it('should move to top', () => {
      const { movePlayerToUp, player } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToUp()

      expect(player.y).toBe(0)
    })
    it('should move to bottom', () => {
      const { movePlayerToDown, player } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToDown()

      expect(player.y).toBe(2)
    })
  })

  describe('collision wall', () => {
    beforeEach(() => {
      // setup
      const { setupMap } = useMapStore()
      setupMap([
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ])
    })
    it('should not move to left when collision a wall', () => {
      const { player, movePlayerToLeft } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToLeft()

      expect(player.x).toBe(1)
    })
    it('should not move to right when collision a wall', () => {
      const { player, movePlayerToRight } = usePlayerStore()
      player.x = 6
      player.y = 1
      movePlayerToRight()

      expect(player.x).toBe(6)
    })
    it('should not move to up when collision a wall', () => {
      const { player, movePlayerToUp } = usePlayerStore()
      player.x = 1
      player.y = 1
      movePlayerToUp()

      expect(player.y).toBe(1)
    })
    it('should not move to down when collision a wall', () => {
      const { player, movePlayerToDown } = usePlayerStore()
      player.x = 1
      player.y = 3
      movePlayerToDown()

      expect(player.y).toBe(3)
    })
  })

  describe('push a cargo', () => {
    beforeEach(() => {
      // setup
      const { setupMap } = useMapStore()
      setupMap([
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ])
    })
    it('should push a cargo to left', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 2, y: 1 })
      addCargo(cargo)
      // setup
      const { player, movePlayerToLeft } = usePlayerStore()
      player.x = 3
      player.y = 1
      movePlayerToLeft()

      expect(player.x).toBe(2)
      expect(cargo.x).toBe(1)
    })
    it('should push a cargo to right', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 2, y: 1 })
      addCargo(cargo)
      // setup
      const { player, movePlayerToRight } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToRight()

      expect(player.x).toBe(2)
      expect(cargo.x).toBe(3)
    })
    it('should push a cargo to up', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 2, y: 2 })
      addCargo(cargo)
      // setup
      const { player, movePlayerToUp } = usePlayerStore()
      player.x = 2
      player.y = 3

      movePlayerToUp()

      expect(player.y).toBe(2)
      expect(cargo.y).toBe(1)
    })
    it('should push a cargo to down', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 2, y: 2 })
      addCargo(cargo)
      // setup
      const { player, movePlayerToDown } = usePlayerStore()
      player.x = 2
      player.y = 1

      movePlayerToDown()

      expect(player.y).toBe(2)
      expect(cargo.y).toBe(3)
    })
    it('fix', () => {
      const map = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ]
      const { setupMap } = useMapStore()
      setupMap(map)
      const { player, movePlayerToRight } = usePlayerStore()
      player.x = 3
      player.y = 1
      movePlayerToRight()

      expect(player.x).toBe(4)
    })
    it('should not push a cargo when collision a wall', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 3, y: 1 })
      addCargo(cargo)
      // setup
      const { player, movePlayerToRight } = usePlayerStore()
      player.x = 2
      player.y = 1

      movePlayerToRight()

      expect(player.x).toBe(2)
      expect(cargo.x).toBe(3)
    })

    it('should not push a cargo when collision a cargo', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 3, y: 1 })
      const cargo1 = createCargo({ x: 2, y: 1 })
      addCargo(cargo)
      addCargo(cargo1)
      // setup
      const { player, movePlayerToRight } = usePlayerStore()
      player.x = 1
      player.y = 1
      movePlayerToRight()

      expect(player.x).toBe(1)
    })
  })
})
