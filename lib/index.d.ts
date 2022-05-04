/**
 * Callback for Array.map
 * @template T Type stored in array
 * @template U Mapped type
 */
export declare type MapCallback<T, U> = (...params: Parameters<Parameters<Array<T>['map']>[0]>) => U;
/**
 * @param array The array
 * @param callback Map callback
 * @param thisArg Optional argument. Binds `this` for the callback
 * @template T Type stored in array
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
export declare function factoryMap<T, U>(array: T[], callback: MapCallback<T, U>, thisArg?: any): Generator<U, void>;
/**
 * Callback for Array.filter
 * @template T Type stored in array
 * @template S Type of all filtered values
 */
export declare type FilterCallback<T, S = unknown> = S extends T ? (value: T, index: number, array: T[]) => value is S : (value: T, index: number, array: T[]) => unknown;
/**
 * @param array The array
 * @param callback Filter callback
 * @param thisArg Optional argument. Binds `this` for the callback
 * @template T Type stored in array
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
export declare function factoryFilter<T, S = unknown>(array: T[], callback: FilterCallback<T, S>, thisArg?: any): Generator<S extends unknown ? T : S, void>;
/**
 * Modified for TypeScript from a Mozilla implementation
 * @see {@link <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#use_generator_function>}
 * @param array The array
 * @param depth How many arrays deep to flatten. Can be `Infinity` for a fully flat array
 * @template T Type stored in array
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
export declare function factoryFlat<T, D extends number = 1>(array: T[], depth?: D): Generator<FlatArray<T[], D>, void>;
/**
 * @param array The array
 * @param callback flatMap callback
 * @param thisArg Optional argument. Binds `this` for callback
 * @template T Type stored in array
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
export declare function factoryFlatMap<T, U>(array: T[], callback: MapCallback<T, U>, thisArg?: any): Generator<FlatArray<U[], 1>, void>;
declare global {
    interface Array<T> {
        /**
         * @param callback Map callback
         * @param thisArg Optional argument. Binds `this` for the callback
         * @template T Type stored in array
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
        factoryMap<U>(callback: MapCallback<T, U>, thisArg?: any): Generator<U, void>;
        /**
         * @param callback Filter callback
         * @param thisArg Optional argument. Binds `this` for the callback
         * @template T Type stored in array
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
        factoryFilter<S extends T>(callback: FilterCallback<T, S>, thisArg?: any): Generator<S, void>;
        factoryFilter(callback: FilterCallback<T>, thisArg?: any): Generator<T, void>;
        /**
         * Modified for TypeScript from a Mozilla implementation
         * @see {@link <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#use_generator_function>}
         * @param depth How many arrays deep to flatten. Can be `Infinity` for a fully flat array
         * @template T Type stored in array
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
        factoryFlat<D extends number = 1>(depth?: D): Generator<FlatArray<T[], D>, void>;
        /**
         * @param callback flatMap callback
         * @param thisArg Optional argument. Binds `this` for callback
         * @template T Type stored in array
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
        factoryFlatMap<U>(callback: MapCallback<T, U>, thisArg?: any): Generator<FlatArray<U[], 1>, void>;
    }
}

export as namespace ArrayFactory;
