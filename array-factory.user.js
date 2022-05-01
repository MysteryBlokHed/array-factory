// ==UserScript==
// @name        array-factory
// @descripton  Array methods that only evaluate for each element when they're needed.
// @version     0.1.0
// @author      Adam Thompson-Sharpe
// @license     MIT
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
exports.factoryMap = void 0;
/**
 * @param array The array
 * @param callback Map callback
 * @param thisArg Optional argument. Binds `this` for the callback
 */
function* factoryMap(array, callback, thisArg) {
    if (thisArg)
        callback = callback.bind(thisArg);
    const length = array.length;
    for (let i = 0; i < length; i++)
        yield callback(array[i], i, array);
}
exports.factoryMap = factoryMap;
Object.defineProperty(Array.prototype, 'factoryMap', {
    value: function (callback, thisArg) {
        return factoryMap(this, callback, thisArg);
    },
});

})();

window.ArrayFactory = __webpack_exports__;
/******/ })()
;