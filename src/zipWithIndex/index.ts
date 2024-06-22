import { isAsyncIterable, isIterable } from "../_internal/utils";
import { concurrent, isConcurrent } from "../concurrent";
import { map } from "../map";
import { ReturnZipWithIndexType } from "../types";

function _zipWithIndex<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  iterable: T,
): ReturnZipWithIndexType<T> {
  let i = -1;

  return map((a) => [++i, a], iterable as any) as any;
}

function async<T>(iterable: AsyncIterable<T>) {
  let _iterator: AsyncIterator<[number, T]>;
  return {
    async next(_concurrent: any) {
      if (_iterator === undefined) {
        _iterator = isConcurrent(_concurrent)
          ? _zipWithIndex(concurrent(_concurrent.length, iterable))
          : _zipWithIndex(iterable);
      }
      return _iterator.next(_concurrent);
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

function zipWithIndex<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  iterable: T,
): ReturnZipWithIndexType<T>;

function zipWithIndex<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): IterableIterator<[number, T]> | AsyncIterableIterator<[number, T]> {
  if (isAsyncIterable(iterable)) {
    return async(iterable);
  }
  if (isIterable(iterable)) {
    return _zipWithIndex(iterable);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { zipWithIndex };
