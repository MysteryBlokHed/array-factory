/** Callback for Array.map */
export declare type MapCallback<T, U> = (...params: Parameters<Parameters<Array<T>['map']>[0]>) => U;
/**
 * @param array The array
 * @param callback Map callback
 * @param thisArg Optional argument. Binds `this` for the callback
 */
export declare function factoryMap<T, U>(array: T[], callback: MapCallback<T, U>, thisArg?: any): Generator<U, void, unknown>;
declare global {
    interface Array<T> {
        /**
         * @param callback Map callback
         * @param thisArg Optional argument. Binds `this` for the callback
         */
        factoryMap<U>(callback: MapCallback<T, U>, thisArg?: any): Generator<U, void>;
    }
}

export as namespace ArrayFactory;
