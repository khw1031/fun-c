import { isAsyncIterable, isIterable } from "../_internal/utils";
import { isNumber } from "../isNumber";
import { concurrent, isConcurrent } from "../concurrent";
import type { ReturnIterableIteratorType } from "../types";

function* sync<T>(
  start: number,
  end: number,
  iterable: Iterable<T>,
): IterableIterator<T> {
  let i = 0;
  for (const item of iterable) {
    if (i >= start && i < end) {
      yield item;
    }
    i += 1;
  }
}

async function* asyncSequential<T>(
  start: number,
  end: number,
  iterable: AsyncIterable<T>,
): AsyncIterableIterator<T> {
  let i = 0;
  for await (const item of iterable) {
    if (i >= start && i < end) {
      yield item;
    }
    i += 1;
  }
}

function async<T>(
  start: number,
  end: number,
  iterable: AsyncIterable<T>,
): AsyncIterableIterator<T> {
  let iterator: AsyncIterator<T>;
  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next(_concurrent: any) {
      if (iterator === undefined) {
        iterator = isConcurrent(_concurrent)
          ? asyncSequential(
              start,
              end,
              concurrent(_concurrent.length, iterable),
            )
          : asyncSequential(start, end, iterable);
      }

      return iterator.next(_concurrent);
    },
  };
}

function _slice<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
  end: number,
  iterable: T,
) {
  if (!isNumber(start) || !isNumber(end)) {
    throw new TypeError("'start' and 'end' must be type of number");
  }

  if (isIterable(iterable)) {
    return sync(start, end, iterable);
  }

  if (isAsyncIterable(iterable)) {
    return async(start, end, iterable);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

function slice<T>(start: number, iterable: Iterable<T>): IterableIterator<T>;

function slice<T>(
  start: number,
  iterable: AsyncIterable<T>,
): AsyncIterableIterator<T>;

function slice<T>(
  start: number,
  end: number,
  iterable: Iterable<T>,
): IterableIterator<T>;

function slice<T>(
  start: number,
  end: number,
  iterable: AsyncIterable<T>,
): AsyncIterableIterator<T>;

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
): (iterable: A) => ReturnIterableIteratorType<A>;

function slice<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number,
  end: number,
): (iterable: A) => ReturnIterableIteratorType<A>;

function slice<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  start: number | T,
  end?: number | T,
  iterable?: T,
) {
  if (iterable === undefined) {
    if (end === undefined) {
      return (iterable: T) => {
        return _slice(start as number, Infinity, iterable);
      };
    }

    if (isIterable(end) || isAsyncIterable(end)) {
      return _slice(start as number, Infinity, end);
    }

    if (isNumber(end)) {
      return (iterable: T) => {
        return _slice(start as number, end, iterable);
      };
    }

    return (iterable: T) => {
      return _slice(0, Infinity, iterable);
    };
  }

  return _slice(start as number, end as number, iterable as T);
}

export { slice };
