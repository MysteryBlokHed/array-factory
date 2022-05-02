const define = (prop: PropertyKey, value: any) =>
  Object.defineProperty(Array.prototype, prop, { value })

// =========================
//      factoryMap
// =========================

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
): Generator<U, void> {
  if (thisArg) callback = callback.bind(thisArg)
  for (let i = 0; i < array.length; i++) yield callback(array[i], i, array)
}

define('factoryMap', function (this: unknown[], callback, thisArg?) {
  return factoryMap(this, callback, thisArg)
} as Array<unknown>['factoryMap'])

// =========================
//      factoryFilter
// =========================

/** Callback for Array.filter */
export type FilterCallback<T, S = unknown> = S extends T
  ? (value: T, index: number, array: T[]) => value is S
  : (value: T, index: number, array: T[]) => unknown

/**
 * @param array The array
 * @param callback Filter callback
 * @param thisArg Optional argument. Binds `this` for the callback
 */
export function* factoryFilter<T, S = unknown>(
  array: T[],
  callback: FilterCallback<T, S>,
  thisArg?: any,
): Generator<S extends unknown ? T : S, void> {
  if (thisArg) callback = callback.bind(thisArg)
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (callback(item, i, array)) yield item
  }
}

define(
  'factoryFilter',
  function (this: unknown[], callback: FilterCallback<unknown>, thisArg?: any) {
    return factoryFilter(this, callback, thisArg)
  },
)

/**
 * Modified for TypeScript from a Mozilla implementation
 * @see {@link <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#use_generator_function>}
 * @param array The array
 * @param depth How many arrays deep to flatten. Can be `Infinity` for a fully flat array
 */
export function* factoryFlat<T, D extends number = 1>(
  array: T[],
  depth?: D,
): Generator<FlatArray<T[], D>, void> {
  if (depth === undefined) {
    depth = 1 as D
  }

  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      yield* factoryFlat(item, depth - 1)
    } else {
      yield item as any
    }
  }
}

define('factoryFlat', function (this: unknown[], depth?) {
  return factoryFlat(this, depth) as any
} as Array<unknown>['flat'])

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

    /**
     * @param callback Filter callback
     * @param thisArg Optional argument. Binds `this` for the callback
     */
    factoryFilter<S extends T>(
      callback: FilterCallback<T, S>,
      thisArg?: any,
    ): Generator<S, void>

    factoryFilter(
      callback: FilterCallback<T>,
      thisArg?: any,
    ): Generator<T, void>

    /**
     * Modified for TypeScript from a Mozilla implementation
     * @see {@link <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#use_generator_function>}
     * @param depth How many arrays deep to flatten. Can be `Infinity` for a fully flat array
     */
    factoryFlat<D extends number = 1>(
      depth?: D,
    ): Generator<FlatArray<T[], D>, void>
  }
}
