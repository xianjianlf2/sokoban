import { usePlayerStore } from '../../store/player'

export function useMove() {
  const {
    movePlayerToLeft,
    movePlayerToTop,
    movePlayerToDown,
    movePlayerToRight
  } = usePlayerStore()

  window.addEventListener('keyup', (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowLeft':
        movePlayerToLeft()
        break
      case 'ArrowRight':
        movePlayerToRight()
        break
      case 'ArrowUp':
        movePlayerToTop()
        break
      case 'ArrowDown':
        movePlayerToDown()
        break
    }
  })
}
