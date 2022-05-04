"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factoryFlatMap = exports.factoryFlat = exports.factoryFilter = exports.factoryMap = void 0;
const define = (prop, value) => Object.defineProperty(Array.prototype, prop, { value });
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
function* factoryMap(array, callback, thisArg) {
    if (thisArg)
        callback = callback.bind(thisArg);
    for (let i = 0; i < array.length; i++)
        yield callback(array[i], i, array);
}
exports.factoryMap = factoryMap;
define('factoryMap', function (callback, thisArg) {
    return factoryMap(this, callback, thisArg);
});
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
function* factoryFilter(array, callback, thisArg) {
    if (thisArg)
        callback = callback.bind(thisArg);
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (callback(item, i, array))
            yield item;
    }
}
exports.factoryFilter = factoryFilter;
define('factoryFilter', function (callback, thisArg) {
    return factoryFilter(this, callback, thisArg);
});
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
function* factoryFlat(array, depth) {
    if (depth === undefined) {
        depth = 1;
    }
    for (const item of array) {
        if (Array.isArray(item) && depth > 0) {
            yield* factoryFlat(item, depth - 1);
        }
        else {
            yield item;
        }
    }
}
exports.factoryFlat = factoryFlat;
define('factoryFlat', function (depth) {
    return factoryFlat(this, depth);
});
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
function* factoryFlatMap(array, callback, thisArg) {
    if (thisArg)
        callback = callback.bind(thisArg);
    for (let i = 0; i < array.length; i++) {
        const result = callback(array[i], i, array);
        // Yield each element indivudually if result is an array,
        // effectively flattening with depth 1
        if (Array.isArray(result)) {
            yield* result;
        }
        else {
            yield result;
        }
    }
}
exports.factoryFlatMap = factoryFlatMap;
define('factoryFlatMap', function (callback, thisArg) {
    return factoryFlatMap(this, callback, thisArg);
});
