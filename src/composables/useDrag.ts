export function useDrag() {
  let isDrag = false

  function startDrag() {
    isDrag = true
  }

  function stopDrag() {
    isDrag = false
  }

  function isDragging() {
    return isDrag
  }

  return {
    startDrag,
    stopDrag,
    isDragging,
  }
}
