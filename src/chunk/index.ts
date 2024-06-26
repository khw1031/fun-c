import {
  asyncEmpty,
  empty,
  isAsyncIterable,
  isIterable,
} from "../_internal/utils";
import { toArray } from "../toArray";
import type { IterableInfer } from "../types/IterableInfer";
import type { ReturnIterableIteratorType } from "../types/ReturnIterableIteratorType";
import { concurrent, isConcurrent } from "../concurrent";
import { take } from "../take";

function* sync<T>(size: number, iterable: Iterable<T>): IterableIterator<T[]> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const c = toArray(
      take(size, {
        [Symbol.iterator]() {
          return iterator;
        },
      }),
    );
    if (c.length > 0) yield c;
    if (c.length < size) return;
  }
}

async function* asyncSequential<T>(
  size: number,
  iterable: AsyncIterable<T>,
): AsyncIterableIterator<T[]> {
  let i = 0;
  let items: T[] = [];
  for await (const item of iterable) {
    if (i++ < size) {
      items.push(item);
    }
    if (i === size) {
      yield items;
      i = 0;
      items = [];
    }
  }
  if (items.length) {
    yield items;
  }
}

function async<T>(
  size: number,
  iterable: AsyncIterable<T>,
): AsyncIterableIterator<T[]> {
  let _iterator: AsyncIterator<T[]>;
  return {
    async next(_concurrent: any) {
      if (_iterator === undefined) {
        _iterator = isConcurrent(_concurrent)
          ? asyncSequential(size, concurrent(_concurrent.length, iterable))
          : asyncSequential(size, iterable);
      }
      return _iterator.next(_concurrent);
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

function chunk<T>(size: number, iterable: Iterable<T>): IterableIterator<T[]>;
function chunk<T>(
  size: number,
  iterable: AsyncIterable<T>,
): AsyncIterableIterator<T[]>;

function chunk<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  size: number,
): (iterable: T) => ReturnIterableIteratorType<T, IterableInfer<T>[]>;

function chunk<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  size: number,
  iterable?: T,
):
  | IterableIterator<IterableInfer<T>[]>
  | AsyncIterableIterator<IterableInfer<T>[]>
  | ((iterable: T) => ReturnIterableIteratorType<T, IterableInfer<T>[]>) {
  if (iterable === undefined) {
    return (iterable: T) =>
      chunk(size, iterable as any) as ReturnIterableIteratorType<
        T,
        IterableInfer<T>[]
      >;
  }

  if (isIterable(iterable)) {
    if (size < 1) {
      return empty();
    } else {
      return sync(size, iterable) as IterableIterator<IterableInfer<T>[]>;
    }
  }

  if (isAsyncIterable(iterable)) {
    if (size < 1) {
      return asyncEmpty();
    } else {
      return async(size, iterable) as AsyncIterableIterator<IterableInfer<T>[]>;
    }
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { chunk };
