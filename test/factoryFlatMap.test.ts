import { factoryFlatMap } from '../lib'

describe('factoryFlatMap', () => {
  it('works with exported function', () => {
    const myArray = [1, 2, 3]
    const flatMap = factoryFlatMap(myArray, el => [el, el * 2])
    expect([...flatMap]).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('works with defined property', () => {
    const myArray = [1, 2, 3]
    const flatMap = myArray.factoryFlatMap(el => [el, el * 2])
    expect([...flatMap]).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('can be chained', () => {
    const myArray = [1, 2, 3]

    const flatMap = myArray
      .factoryFlatMap(el => [el, el * 2])
      .factoryFlatMap(el => [el, el])

    expect([...flatMap]).toEqual([1, 1, 2, 2, 2, 2, 4, 4, 3, 3, 6, 6])
  })
})
