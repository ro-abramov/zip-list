declare class Zipper<T> implements Iterable<T> {
    private _previousList;
    private _currentItem;
    private _nextList;
    private _currentIndex;
    private _maxLength;
    constructor(initialArray: ArrayLike<T>, index?: number);
    static of<U>(initialArray: ArrayLike<U>, index?: number): Zipper<U>;
    previous(): this;
    next(): this;
    readonly value: T;
    push(value: T): this;
    unshift(value: T): this;
    map<U>(callback: (value: T) => U): Zipper<U>;
    filter(predicate: (value: T) => boolean): Zipper<T>;
    toArray(): Array<T>;
    private parseArrayLike<T>(a);
    private isLeftBound(index);
    private isUpperBound(index);
    [Symbol.iterator](): Iterator<T>;
}
