"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
