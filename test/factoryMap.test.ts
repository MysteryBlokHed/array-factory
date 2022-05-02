import { factoryMap } from '../lib'

describe('factoryMap', () => {
  it('works with exported function', () => {
    const array = [1, 2, 3]

    let i = 0

    // Double original numbers
    for (const num of factoryMap(array, el => el * 2)) {
      expect(num).toBe(array[i] * 2)
      i++
    }
  })

  it('works with defined property', () => {
    const array = [1, 2, 3]

    let i = 0

    // Double original numbers
    for (const num of array.factoryMap(el => el * 2)) {
      expect(num).toBe(array[i] * 2)
      i++
    }
  })
})
