import { isAsyncIterable, isIterable } from "../_internal/utils";
import type { IterableInfer, ReturnIterableIteratorType } from "../types";
import { concurrent, isConcurrent } from "../concurrent";

function* sync<T>(iterable: Iterable<T>): IterableIterator<T> {
  const arr = [];
  for (const a of iterable) {
    yield a;
    arr.push(a);
  }

  while (arr.length) {
    for (const a of arr) {
      yield a;
    }
  }
}

async function* asyncSequential<T>(
  iterable: AsyncIterable<T>,
): AsyncIterableIterator<T> {
  const arr = [];
  for await (const a of iterable) {
    yield a;
    arr.push(a);
  }

  while (arr.length) {
    for (const a of arr) {
      yield a;
    }
  }
}

function async<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> {
  let _iterator: AsyncIterator<T>;
  return {
    async next(_concurrent: any) {
      if (_iterator === undefined) {
        _iterator = isConcurrent(_concurrent)
          ? asyncSequential(concurrent(_concurrent.length, iterable))
          : asyncSequential(iterable);
      }
      return _iterator.next(_concurrent);
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

function cycle<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnIterableIteratorType<A>;

function cycle<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  iterable: T,
):
  | IterableIterator<IterableInfer<T>>
  | AsyncIterableIterator<IterableInfer<T>> {
  if (isIterable<IterableInfer<T>>(iterable)) {
    return sync(iterable);
  }
  if (isAsyncIterable<IterableInfer<T>>(iterable)) {
    return async(iterable);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { cycle };
