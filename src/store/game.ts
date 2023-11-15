import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { GameData } from '../game/gameData'
import { useCargoStore } from './cargo'
import { useMapStore } from './map'
import { usePlayerStore } from './player'
import { useTargetStore } from './target'

interface Game {
  isGameCompleted: boolean
  level: number
}

export const useGameStore = defineStore('game', () => {
  const game = reactive<Game>({
    isGameCompleted: false,
    level: 1,

  })
  let _gameData: GameData = []

  function detectionGameCompleted() {
    const { cargos } = useCargoStore()

    game.isGameCompleted = cargos.every(c => c.onTarget)
  }

  function setupGame(gameData: GameData) {
    _gameData = gameData
    setupLevel()
  }

  function toNextLevel() {
    game.level += 1
    game.isGameCompleted = false
    setupLevel()
  }

  function setupLevel() {
    const levelGameData = _gameData[game.level - 1]

    const { player } = usePlayerStore()
    player.x = levelGameData.player.x
    player.y = levelGameData.player.y

    const { setupMap } = useMapStore()
    setupMap(levelGameData.map)

    const { addCargo, createCargo, cleanAllCargos } = useCargoStore()
    cleanAllCargos()

    levelGameData.cargos.forEach((c) => {
      addCargo(createCargo(c))
    })

    const { createTarget, addTarget, cleanAllTargets } = useTargetStore()
    cleanAllTargets()
    levelGameData.targets.forEach((t) => {
      addTarget(createTarget(t))
    })
  }

  return {
    toNextLevel,
    detectionGameCompleted,
    game,
    setupGame,
  }
})
