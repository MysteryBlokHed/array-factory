// ==UserScript==
// @name        array-factory
// @descripton  Array methods that only evaluate for each element when they're needed.
// @version     0.1.0
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
exports.factoryFlat = exports.factoryFilter = exports.factoryMap = void 0;
const define = (prop, value) => Object.defineProperty(Array.prototype, prop, { value });
/**
 * @param array The array
 * @param callback Map callback
 * @param thisArg Optional argument. Binds `this` for the callback
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

})();

window.ArrayFactory = __webpack_exports__;
/******/ })()
;