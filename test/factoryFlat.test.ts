import { factoryFlat } from '../lib'

describe('factoryFlat', () => {
  it('works with exported function', () => {
    // Depth 1
    const nested1 = [1, 2, [3, 4]]
    const nested1Flat = nested1.flat()
    const nested1Factory = factoryFlat(nested1)

    expect([...nested1Factory]).toEqual(nested1Flat)

    // Depth 2
    const nested2 = [1, 2, [3, 4, [5, 6]]]
    const nested2Flat = nested2.flat(2)
    const nested2Factory = factoryFlat(nested2, 2)

    expect([...nested2Factory]).toEqual(nested2Flat)
  })

  it('works with defined property', () => {
    // Depth 1
    const nested1 = [1, 2, [3, 4]]
    const nested1Flat = nested1.flat()
    const nested1Factory = nested1.factoryFlat()

    expect([...nested1Factory]).toEqual(nested1Flat)

    // Depth 2
    const nested2 = [1, 2, [3, 4, [5, 6]]]
    const nested2Flat = nested2.flat(2)
    const nested2Factory = nested2.factoryFlat(2)

    expect([...nested2Factory]).toEqual(nested2Flat)
  })

  it('can be chained', () => {
    const nested2 = [1, 2, [3, 4, [5, 6]]]
    const flat = nested2.factoryFlat().factoryFlat()

    expect([...flat]).toEqual([1, 2, 3, 4, 5, 6])
  })
})
