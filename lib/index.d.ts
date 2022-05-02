/** Callback for Array.map */
export declare type MapCallback<T, U> = (...params: Parameters<Parameters<Array<T>['map']>[0]>) => U;
/**
 * @param array The array
 * @param callback Map callback
 * @param thisArg Optional argument. Binds `this` for the callback
 */
export declare function factoryMap<T, U>(array: T[], callback: MapCallback<T, U>, thisArg?: any): Generator<U, void>;
/** Callback for Array.filter */
export declare type FilterCallback<T, S = unknown> = S extends T ? (value: T, index: number, array: T[]) => value is S : (value: T, index: number, array: T[]) => unknown;
/**
 * @param array The array
 * @param callback Filter callback
 * @param thisArg Optional argument. Binds `this` for the callback
 */
export declare function factoryFilter<T, S = unknown>(array: T[], callback: FilterCallback<T, S>, thisArg?: any): Generator<S extends unknown ? T : S, void>;
/**
 * Modified for TypeScript from a Mozilla implementation
 * @see {@link <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#use_generator_function>}
 * @param array The array
 * @param depth How many arrays deep to flatten. Can be `Infinity` for a fully flat array
 */
export declare function factoryFlat<T, D extends number = 1>(array: T[], depth?: D): Generator<FlatArray<T[], D>, void>;
declare global {
    interface Array<T> {
        /**
         * @param callback Map callback
         * @param thisArg Optional argument. Binds `this` for the callback
         */
        factoryMap<U>(callback: MapCallback<T, U>, thisArg?: any): Generator<U, void>;
        /**
         * @param callback Filter callback
         * @param thisArg Optional argument. Binds `this` for the callback
         */
        factoryFilter<S extends T>(callback: FilterCallback<T, S>, thisArg?: any): Generator<S, void>;
        factoryFilter(callback: FilterCallback<T>, thisArg?: any): Generator<T, void>;
        /**
         * Modified for TypeScript from a Mozilla implementation
         * @see {@link <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#use_generator_function>}
         * @param depth How many arrays deep to flatten. Can be `Infinity` for a fully flat array
         */
        factoryFlat<D extends number = 1>(depth?: D): Generator<FlatArray<T[], D>, void>;
    }
}

export as namespace ArrayFactory;
