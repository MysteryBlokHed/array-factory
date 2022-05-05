import { factoryFlat } from '../lib'

describe('factoryFlat', () => {
  it('works with exported function', () => {
    const nested1 = [1, 2, [3, 4]]
    const nested1Flat = nested1.flat()

    let i = 0

    for (const item of factoryFlat(nested1)) {
      expect(item).toBe(nested1Flat[i])
      i++
    }

    const nested2 = [1, 2, [3, 4, [5, 6]]]
    const nested2Flat = nested2.flat(2)

    i = 0

    for (const item of factoryFlat(nested2, 2)) {
      expect(item).toBe(nested2Flat[i])
      i++
    }
  })

  it('works with defined property', () => {
    const nested1 = [1, 2, [3, 4]]
    const nested1Flat = nested1.flat()

    let i = 0

    for (const item of nested1.factoryFlat()) {
      expect(item).toBe(nested1Flat[i])
      i++
    }

    const nested2 = [1, 2, [3, 4, [5, 6]]]
    const nested2Flat = nested2.flat(2)

    i = 0

    for (const item of nested2.factoryFlat(2)) {
      expect(item).toBe(nested2Flat[i])
      i++
    }
  })

  it('can be chained', () => {
    const nested2 = [1, 2, [3, 4, [5, 6]]]
    const flat = nested2.factoryFlat().factoryFlat()

    expect([...flat]).toEqual([1, 2, 3, 4, 5, 6])
  })
})
