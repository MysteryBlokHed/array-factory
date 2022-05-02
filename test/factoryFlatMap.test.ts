import { factoryFlatMap } from '../lib'

describe('factoryFlatMap', () => {
  it('works with exported function', () => {
    const myArray = [1, 2, 3]

    const result = []

    for (const item of factoryFlatMap(myArray, el => [el, el * 2])) {
      result.push(item)
    }

    expect(result).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('works with defined property', () => {
    const myArray = [1, 2, 3]

    const result = []

    for (const item of myArray.factoryFlatMap(el => [el, el * 2])) {
      result.push(item)
    }

    expect(result).toEqual([1, 2, 2, 4, 3, 6])
  })
})
