// ==UserScript==
// @name        array-factory
// @descripton  Array methods that only evaluate for each element when they're needed.
// @version     0.2.0
// @author      Adam Thompson-Sharpe
// @license     MIT OR Apache-2.0
// @homepageURL https://gitlab.com/MysteryBlokHed/array-factory
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.factoryFlatMap = exports.factoryFlat = exports.factoryFilter = exports.factoryMap = void 0;
/**
 * Prototype for Generator objects.
 * Used to define properties to allow chaining factory functions
 */
const generatorProto = Object.getPrototypeOf(Object.getPrototypeOf((function* () { })()));
const define = (prop, value) => {
    Object.defineProperty(Array.prototype, prop, { value });
    Object.defineProperty(generatorProto, prop, { value });
};
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
    let i = 0;
    for (const item of array) {
        yield callback(item, i, array);
        i++;
    }
}
exports.factoryMap = factoryMap;
const test = [1, 2, 3];
factoryMap(test, el => el);
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
    let i = 0;
    for (const item of array) {
        if (callback(item, i, array))
            yield item;
        i++;
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
    let i = 0;
    for (const item of array) {
        const result = callback(item, i, array);
        i++;
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

})();

window.ArrayFactory = __webpack_exports__;
/******/ })()
;