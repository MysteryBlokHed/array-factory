"use strict";
// =========================
//      factoryMap
// =========================
Object.defineProperty(exports, "__esModule", { value: true });
exports.factoryFilter = exports.factoryMap = void 0;
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
Object.defineProperty(Array.prototype, 'factoryMap', {
    value: function (callback, thisArg) {
        return factoryMap(this, callback, thisArg);
    },
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
Object.defineProperty(Array.prototype, 'factoryFilter', {
    value: function (callback, thisArg) {
        return factoryFilter(this, callback, thisArg);
    },
});
