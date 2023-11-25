import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useMapEditStore } from '../mapEdit'

describe('mapEdit', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should init map', () => {
    const { initMap, map } = useMapEditStore()
    const row = 8
    const col = 8

    initMap()

    expect(map.length).toBe(row)
    expect(map[0].length).toBe(col)
  })

  describe('row', () => {
    it('should add a line when increase', () => {
      const { updateMapRow, map, initMap, setRow } = useMapEditStore()
      initMap(2, 2)
      setRow(4)
      updateMapRow()

      expect(map).toMatchInlineSnapshot(`
        [
          [
            2,
            2,
          ],
          [
            2,
            2,
          ],
          [
            2,
            2,
          ],
          [
            2,
            2,
          ],
        ]
      `)
    })
    it('should remove a line when decrease', () => {
      const { updateMapRow, map, initMap, setRow } = useMapEditStore()
      initMap(3, 2)
      setRow(1)
      updateMapRow()
      expect(map).toMatchInlineSnapshot(`
        [
          [
            2,
            2,
          ],
          [
            2,
            2,
          ],
        ]
      `)
    })
  })
})
