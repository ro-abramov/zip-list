"use strict";
class Zipper {
    constructor(initialArray, index) {
        this._previousList = [];
        this._nextList = [];
        const fromArrayLike = initialArray.length === 0 ? [] : this.parseArrayLike(initialArray);
        this._maxLength = fromArrayLike.length;
        this._currentIndex = index === void 0 ? 0 : index;
        this._currentItem = fromArrayLike[this._currentIndex];
        if (this._currentIndex === 0) {
            this._nextList = fromArrayLike.slice(1);
        }
        else {
            this._previousList = fromArrayLike.slice(0, this._currentIndex);
            this._nextList = fromArrayLike.slice(this._currentIndex + 1);
        }
    }
    static of(initialArray, index) {
        return new Zipper(initialArray, index);
    }
    previous() {
        if (this.isLeftBound(this._currentIndex)) {
            return this;
        }
        this._currentIndex = this._currentIndex - 1;
        this._nextList = [this._currentItem, ...this._nextList];
        this._currentItem = this._previousList.pop();
        this._previousList = [...this._previousList];
        return this;
    }
    next() {
        if (this.isUpperBound(this._currentIndex)) {
            return this;
        }
        this._currentIndex = this._currentIndex + 1;
        this._previousList = [...this._previousList, this._currentItem];
        this._currentItem = this._nextList.shift();
        this._nextList = [...this._nextList];
        return this;
    }
    get value() {
        return this._currentItem;
    }
    push(value) {
        this._nextList = [...this._nextList, value];
        this._maxLength = this._maxLength + 1;
        return this;
    }
    unshift(value) {
        this._previousList = [value, ...this._previousList];
        this._maxLength = this._maxLength + 1;
        this._currentIndex = this._currentIndex + 1;
        return this;
    }
    map(callback) {
        return Zipper.of(this.toArray().map(callback), this._currentIndex);
    }
    filter(predicate) {
        return Zipper.of(this.toArray().filter(predicate), this._currentIndex);
    }
    toArray() {
        return [...this._previousList, this._currentItem, ...this._nextList];
    }
    parseArrayLike(a) {
        return Array.prototype.slice.call(a);
    }
    isLeftBound(index) {
        return index === 0;
    }
    isUpperBound(index) {
        return index === this._maxLength - 1;
    }
    [Symbol.iterator]() {
        const array = this.toArray();
        return array[Symbol.iterator]();
    }
}
