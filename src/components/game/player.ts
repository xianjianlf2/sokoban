import { useGameStore } from '../../store/game'
import { usePlayerStore } from '../../store/player'

export function useMove() {
  const {
    movePlayerToLeft,
    movePlayerToDown,
    movePlayerToRight,
    movePlayerToUp,
  } = usePlayerStore()

  const { detectionGameCompleted } = useGameStore()

  function handleKeyup(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowLeft':
        movePlayerToLeft()
        break
      case 'ArrowRight':
        movePlayerToRight()
        break
      case 'ArrowUp':
        movePlayerToUp()
        break
      case 'ArrowDown':
        movePlayerToDown()
        break
    }
    detectionGameCompleted()
  }

  window.addEventListener('keyup', handleKeyup)
}
