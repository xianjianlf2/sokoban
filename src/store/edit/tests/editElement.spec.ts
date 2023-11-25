import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { floorEditElement, useEditElementStore, wallEditElement } from '../editElement'
import { useMapEditStore } from '../mapEdit'
import { MapTile } from '../../map'

describe('editElement', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const { initMap } = useMapEditStore()
    initMap()
  })

  it('should change to wall when current selected element is wall', () => {
    const { getCurrentSelectedEditElement, setCurrentSelectedEditElement } = useEditElementStore()
    const { map } = useMapEditStore()

    setCurrentSelectedEditElement(wallEditElement)

    getCurrentSelectedEditElement().execute({ x: 1, y: 1 })

    expect(map[1][1]).toBe(MapTile.WALL)
  })

  it('should change to floor when current selected element is floor', () => {
    const { getCurrentSelectedEditElement, setCurrentSelectedEditElement } = useEditElementStore()
    const { map } = useMapEditStore()

    setCurrentSelectedEditElement(floorEditElement)

    getCurrentSelectedEditElement().execute({ x: 1, y: 1 })

    expect(map[1][1]).toBe(MapTile.FLOOR)
  })
})
