import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { floorEditElement, playerEditElement, useEditElementStore, wallEditElement } from '../editElement'
import { useMapEditStore } from '../mapEdit'
import { MapTile } from '../../map'
import { useEditPlayerStore } from '../editPlayer'

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
  it('should update position when player position is change', () => {
    const { getCurrentSelectedEditElement, setCurrentSelectedEditElement } = useEditElementStore()
    const { player } = useEditPlayerStore()

    setCurrentSelectedEditElement(playerEditElement)

    const position = {
      x: 1,
      y: 1,
    }
    getCurrentSelectedEditElement().execute(position)

    expect(player.x).toBe(position.x)
    expect(player.y).toBe(position.y)
  })
})
