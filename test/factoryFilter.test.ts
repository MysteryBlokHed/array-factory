import { factoryFilter } from '../lib'

describe('factoryFilter', () => {
  it('works with exported function', () => {
    const array = [1, 2, 3, 4]

    let next = 2

    // Filter out odd numbers
    for (const item of factoryFilter(array, el => !(el % 2))) {
      expect(item).toBe(next)
      next += 2
    }
  })

  it('works with defined property', () => {
    const array = [1, 2, 3, 4]

    let next = 2

    // Filter out odd numbers
    for (const item of array.factoryFilter(el => !(el % 2))) {
      expect(item).toBe(next)
      next += 2
    }
  })
})
