export type ArrayItemHandlerParams<T> = [value: T, index: number, array: T[]];

export type ArrayItemHandler<T, R> = (...args: ArrayItemHandlerParams<T>) => R;
