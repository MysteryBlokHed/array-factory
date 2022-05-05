import { factoryMap } from '../lib'

describe('factoryMap', () => {
  it('works with exported function', () => {
    const array = [1, 2, 3]
    // Double original numbers
    const map = factoryMap(array, el => el * 2)
    expect([...map]).toEqual([2, 4, 6])
  })

  it('works with defined property', () => {
    const array = [1, 2, 3]
    // Double original numbers
    const map = array.factoryMap(el => el * 2)
    expect([...map]).toEqual([2, 4, 6])
  })

  it('can be chained', () => {
    const array = [1, 2, 3]
    const map = array.factoryMap(el => el * 2).factoryMap(el => el ** 2)
    expect([...map]).toEqual([4, 16, 36])
  })
})
