class Zipper<T> implements Iterable<T> {
    private _previousList: Array<T> = [];
    private _currentItem: T;
    private _nextList: Array<T> = [];
    private _currentIndex: number;
    private _maxLength: number;

    constructor(initialArray: ArrayLike<T>, index?: number) {
        const fromArrayLike: Array<T> = initialArray.length === 0 ? [] : this.parseArrayLike(initialArray);
        this._maxLength = fromArrayLike.length;
        this._currentIndex = index === void 0 ? 0 : index;
        this._currentItem = fromArrayLike[this._currentIndex];
        if (this._currentIndex === 0) {
            this._nextList = fromArrayLike.slice(1);
        } else {
            this._previousList = fromArrayLike.slice(0, this._currentIndex);
            this._nextList = fromArrayLike.slice(this._currentIndex + 1);
        }
    }

    public static of<U>(initialArray: ArrayLike<U>, index?: number): Zipper<U> {
        return new Zipper(initialArray, index);
    }

    public previous() {
        if (this.isLeftBound(this._currentIndex)) {
            return this;
        }
        this._currentIndex = this._currentIndex - 1;
        this._nextList = [this._currentItem, ...this._nextList];
        this._currentItem = this._previousList.pop() as T;
        this._previousList = [...this._previousList];
        return this;
    }

    public next() {
        if (this.isUpperBound(this._currentIndex)) {
            return this;
        }
        this._currentIndex = this._currentIndex + 1;
        this._previousList = [...this._previousList, this._currentItem];
        this._currentItem = this._nextList.shift() as T;
        this._nextList = [...this._nextList];
        return this;
    }

    public get value(): T {
        return this._currentItem;
    }

    public push(value: T) {
        this._nextList = [...this._nextList, value];
        this._maxLength = this._maxLength + 1;
        return this;
    }

    public unshift(value: T) {
        this._previousList = [value, ...this._previousList];
        this._maxLength = this._maxLength + 1;
        this._currentIndex = this._currentIndex + 1;
        return this;
    }

    public map<U>(callback: (value: T) => U): Zipper<U> {
        return Zipper.of(this.toArray().map(callback), this._currentIndex);
    }

    public filter(predicate: (value: T) => boolean): Zipper<T> {
        return Zipper.of(this.toArray().filter(predicate), this._currentIndex);
    }

    toArray(): Array<T> {
        return [...this._previousList, this._currentItem, ...this._nextList];
    }

    private parseArrayLike<T>(a: ArrayLike<T>): Array<T> {
        return Array.prototype.slice.call(a);
    }

    private isLeftBound(index: number): boolean {
        return index === 0;
    }

    private isUpperBound(index: number): boolean {
        return index === this._maxLength - 1;
    }

    [Symbol.iterator](): Iterator<T> {
        const array = this.toArray();
        return array[Symbol.iterator]();
    }
}
