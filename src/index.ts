/** Callback for Array.map */
export type MapCallback<T, U> = (
  ...params: Parameters<Parameters<Array<T>['map']>[0]>
) => U

/**
 * @param array The array
 * @param callback Map callback
 * @param thisArg Optional argument. Binds `this` for the callback
 */
export function* factoryMap<T, U>(
  array: T[],
  callback: MapCallback<T, U>,
  thisArg?: any,
) {
  if (thisArg) callback = callback.bind(thisArg)
  const length = array.length
  for (let i = 0; i < length; i++) yield callback(array[i], i, array)
}

Object.defineProperty(Array.prototype, 'factoryMap', {
  value: function (this: unknown[], callback, thisArg?) {
    return factoryMap(this, callback, thisArg)
  } as Array<unknown>['factoryMap'],
})

declare global {
  interface Array<T> {
    /**
     * @param callback Map callback
     * @param thisArg Optional argument. Binds `this` for the callback
     */
    factoryMap<U>(
      callback: MapCallback<T, U>,
      thisArg?: any,
    ): Generator<U, void>
  }
}
