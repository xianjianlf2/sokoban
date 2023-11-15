import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCargoStore } from '../cargo'
import { useTargetStore } from '../target'
import { useGameStore } from '../game'
import { useMapStore } from '../map'
import { usePlayerStore } from '../player'
import type { LevelGameData } from '../../game/gameData'

const firstLevelGameData = {
  player: {
    x: 1,
    y: 1,
  },
  map: [[1, 1, 1, 1, 1, 1, 1, 1], [1, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 1], [1, 1, 1, 1, 1, 1, 1, 1]],
  cargos: [
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
  ],
  targets: [
    {
      x: 4,
      y: 4,
    },
    {
      x: 6,
      y: 4,
    },
  ],
}

const secondLevelGameData = {
  player: {
    x: 2,
    y: 1,
  },
  map: [[1, 1, 1, 1, 1, 1, 1, 1], [1, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 1], [1, 1, 1, 1, 1, 1, 1, 1]],
  cargos: [
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
  ],
  targets: [
    {
      x: 4,
      y: 4,
    },
    {
      x: 6,
      y: 4,
    },
  ],
}
const gameData = [firstLevelGameData, secondLevelGameData]

describe('game', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const { setupMap } = useMapStore()

    setupMap([
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ])
  })
  it('should game completed', () => {
    const { addCargo, createCargo, moveCargo } = useCargoStore()
    const cargo = createCargo({ x: 2, y: 1 })
    addCargo(cargo)
    const { addTarget, createTarget } = useTargetStore()
    addTarget(createTarget({ x: 3, y: 1 }))

    moveCargo(cargo, 1, 0)

    const { detectionGameCompleted, game } = useGameStore()

    detectionGameCompleted()
    expect(game.isGameCompleted).toBe(true)
  })

  it('should game not completed', () => {
    const { addCargo, createCargo, moveCargo } = useCargoStore()
    const cargo = createCargo({ x: 2, y: 1 })
    addCargo(cargo)
    const { addTarget, createTarget } = useTargetStore()
    addTarget(createTarget({ x: 3, y: 1 }))

    moveCargo(cargo, 1, 0)
    moveCargo(cargo, 1, 0)

    const { detectionGameCompleted, game } = useGameStore()

    detectionGameCompleted()
    expect(game.isGameCompleted).toBe(false)
  })

  it('should setup game', () => {
    const { setupGame, game } = useGameStore()

    setupGame(gameData)

    expectSetupLevelGameData(firstLevelGameData)
    expect(game.level).toBe(1)
  })
  it('should to next level', () => {
    const { setupGame, toNextLevel, game } = useGameStore()

    setupGame(gameData)

    toNextLevel()
    expectSetupLevelGameData(secondLevelGameData)
    expect(game.level).toBe(2)
  })
  it('should be reset game completed when to next level', () => {
    const { setupGame, toNextLevel, game } = useGameStore()
    game.isGameCompleted = true

    setupGame(gameData)

    toNextLevel()
    expect(game.isGameCompleted).toBe(false)
  })
})

function expectSetupLevelGameData(levelGameData: LevelGameData) {
  const { player } = usePlayerStore()
  const { cargos } = useCargoStore()
  const { targets } = useTargetStore()

  expect(cargos.length).toBe(2)
  expect(targets.length).toBe(2)
  expect(player.x).toBe(levelGameData.player.x)
  expect(player.y).toBe(levelGameData.player.y)
}
