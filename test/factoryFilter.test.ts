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

  it('can be chained', () => {
    const array = [3, 6, 9, 12, 15, 18]

    // Only numbers divisible by both 2 and 3
    const filtered = array
      .factoryFilter(el => el % 2 === 0)
      .factoryFilter(el => el % 3 === 0)

    expect([...filtered]).toEqual([6, 12, 18])
  })
})
