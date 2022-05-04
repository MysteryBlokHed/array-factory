const define = (prop: PropertyKey, value: any) =>
  Object.defineProperty(Array.prototype, prop, { value })

// =========================
//      factoryMap
// =========================

/**
 * Callback for Array.map
 * @template T Array type
 * @template U Mapped type
 */
export type MapCallback<T extends readonly any[], U> = (
  value: T[number],
  index: number,
  array: T,
) => U

/**
 * @param array The array
 * @param callback Map callback
 * @param thisArg Optional argument. Binds `this` for the callback
 * @template T Array type
 * @template U Mapped type
 *
 * @example
 * ```typescript
 * const myArray = [1, 2, 3]
 * for (const item of myArray.factoryMap(el => el * 2)) {
 *   console.log(item)
 * }
 * ```
 */
export function* factoryMap<T extends readonly any[], U>(
  array: T,
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

/**
 * Callback for Array.filter
 * @template T Array type
 * @template S Type of all filtered values
 */
export type FilterCallback<T extends readonly any[], S = unknown> = S extends T
  ? (value: T[number], index: number, array: T) => value is S
  : (value: T[number], index: number, array: T) => unknown

/**
 * @param array The array
 * @param callback Filter callback
 * @param thisArg Optional argument. Binds `this` for the callback
 * @template T Array type
 * @template S Type of all filtered values
 *
 * @example
 * ```typescript
 * const myArray = [1, 2, 3]
 * // Only even numbers
 * for (const item of myArray.factoryFilter(el => !(el % 2))) {
 *   console.log(item)
 * }
 * ```
 */
export function* factoryFilter<T extends readonly any[], S = unknown>(
  array: T,
  callback: FilterCallback<T, S>,
  thisArg?: any,
): Generator<S extends unknown ? T[number] : S, void> {
  if (thisArg) callback = callback.bind(thisArg)
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (callback(item, i, array)) yield item
  }
}

define(
  'factoryFilter',
  function (
    this: unknown[],
    callback: FilterCallback<unknown[]>,
    thisArg?: any,
  ) {
    return factoryFilter(this, callback, thisArg)
  },
)

// =========================
//      factoryFlat
// =========================

/**
 * Modified for TypeScript from a Mozilla implementation
 * @see {@link <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#use_generator_function>}
 * @param array The array
 * @param depth How many arrays deep to flatten. Can be `Infinity` for a fully flat array
 * @template T Array type
 * @template D Depth
 *
 * @example
 * ```typescript
 * const myArray = [1, 2, [3, 4]]
 * for (const item of myArray.factoryFlat()) {
 *   console.log(item)
 * }
 * // 1, 2, 3, 4
 * ```
 */
export function* factoryFlat<T extends readonly any[], D extends number = 1>(
  array: T,
  depth?: D,
): Generator<FlatArray<T, D>, void> {
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

// =========================
//      factoryFlatMap
// =========================

/**
 * @param array The array
 * @param callback flatMap callback
 * @param thisArg Optional argument. Binds `this` for callback
 * @template T Array type
 * @template U Mapped type
 *
 * @example
 * ```typescript
 * const myArray = [1, 2, 3]
 * for (const item of myArray.factoryFlatMap(el => [el, el * 2])) {
 *   console.log(item)
 * }
 * // 1, 2, 2, 4, 3, 6
 * ```
 */
export function* factoryFlatMap<T extends readonly any[], U>(
  array: T,
  callback: MapCallback<T, U>,
  thisArg?: any,
): Generator<FlatArray<U[], 1>, void> {
  if (thisArg) callback = callback.bind(thisArg)
  for (let i = 0; i < array.length; i++) {
    const result = callback(array[i], i, array)

    // Yield each element indivudually if result is an array,
    // effectively flattening with depth 1
    if (Array.isArray(result)) {
      yield* result as any
    } else {
      yield result as any
    }
  }
}

define('factoryFlatMap', function (this: unknown[], callback, thisArg?) {
  return factoryFlatMap(this, callback, thisArg)
} as Array<unknown>['factoryFlatMap'])

// =========================
//      Global types
// =========================

/**
 * Methods added to Array and ReadonlyArray interfaces
 */
export interface ArrayMethods<T> {
  /**
   * @param callback Map callback
   * @param thisArg Optional argument. Binds `this` for the callback
   * @template T Array type
   * @template U Mapped type
   *
   * @example
   * ```typescript
   * const myArray = [1, 2, 3]
   * for (const item of myArray.factoryMap(el => el * 2)) {
   *   console.log(item)
   * }
   * ```
   */
  factoryMap<U>(
    callback: MapCallback<T[], U>,
    thisArg?: any,
  ): Generator<U, void>

  /**
   * @param callback Filter callback
   * @param thisArg Optional argument. Binds `this` for the callback
   * @template T Array type
   * @template S Type of all filtered values
   *
   * @example
   * ```typescript
   * const myArray = [1, 2, 3]
   * // Only even numbers
   * for (const item of myArray.factoryFilter(el => !(el % 2))) {
   *   console.log(item)
   * }
   * ```
   */
  factoryFilter<S extends T>(
    callback: FilterCallback<T[], S>,
    thisArg?: any,
  ): Generator<S, void>

  factoryFilter(
    callback: FilterCallback<T[]>,
    thisArg?: any,
  ): Generator<T, void>

  /**
   * Modified for TypeScript from a Mozilla implementation
   * @see {@link <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#use_generator_function>}
   * @param depth How many arrays deep to flatten. Can be `Infinity` for a fully flat array
   * @template T Array type
   * @template D Depth
   *
   * @example
   * ```typescript
   * const myArray = [1, 2, [3, 4]]
   * for (const item of myArray.factoryFlat()) {
   *   console.log(item)
   * }
   * // 1, 2, 3, 4
   * ```
   */
  factoryFlat<D extends number = 1>(
    depth?: D,
  ): Generator<FlatArray<T[], D>, void>

  /**
   * @param callback flatMap callback
   * @param thisArg Optional argument. Binds `this` for callback
   * @template T Array type
   * @template U Mapped type
   *
   * @example
   * ```typescript
   * const myArray = [1, 2, 3]
   * for (const item of myArray.factoryFlatMap(el => [el, el * 2])) {
   *   console.log(item)
   * }
   * // 1, 2, 2, 4, 3, 6
   * ```
   */
  factoryFlatMap<U>(
    callback: MapCallback<T[], U>,
    thisArg?: any,
  ): Generator<FlatArray<U[], 1>, void>
}

declare global {
  interface Array<T> extends ArrayMethods<T> {}
  interface ReadonlyArray<T> extends ArrayMethods<T> {}
}
