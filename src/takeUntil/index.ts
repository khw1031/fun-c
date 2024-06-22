import { AsyncFunctionException } from "../_internal/error";
import { isAsyncIterable, isIterable, isPromise } from "../_internal/utils";
import { concurrent, isConcurrent } from "../concurrent";
import type { IterableInfer, ReturnIterableIteratorType } from "../types";

function* sync<A, B>(f: (a: A) => B, iterable: Iterable<A>) {
  for (const item of iterable) {
    yield item;

    const res = f(item);
    if (isPromise(res)) {
      throw new AsyncFunctionException();
    }

    if (res) {
      break;
    }
  }
}

function asyncSequential<A, B>(
  f: (a: A) => B,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<A> {
  const iterator = iterable[Symbol.asyncIterator]();
  let end = false;
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next(_concurrent) {
      if (end) {
        return { done: true, value: undefined };
      }

      const { done, value } = await iterator.next(_concurrent);
      if (done || end) {
        return { done: true, value: undefined };
      }

      const cond = await f(value);
      if (end) {
        return { done: true, value: undefined };
      }

      if (cond) {
        end = true;
      }

      return { done: false, value };
    },
  };
}

function async<A, B>(
  f: (a: A) => B,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<A> {
  let _iterator: AsyncIterator<A>;
  return {
    async next(_concurrent: any) {
      if (_iterator === undefined) {
        _iterator = isConcurrent(_concurrent)
          ? asyncSequential(f, concurrent(_concurrent.length, iterable))
          : asyncSequential(f, iterable);
      }
      return _iterator.next(_concurrent);
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

function takeUntil<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A>,
): IterableIterator<A>;

function takeUntil<A, B>(
  f: (a: A) => B,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<A>;

function takeUntil<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  f: (a: IterableInfer<A>) => B,
): (iterable: A) => ReturnIterableIteratorType<A>;

function takeUntil<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  f: (a: A) => B,
  iterable?: Iterable<A> | AsyncIterable<A>,
):
  | IterableIterator<IterableInfer<A>>
  | AsyncIterableIterator<IterableInfer<A>>
  | ((iterable: A) => ReturnIterableIteratorType<A>) {
  if (iterable === undefined) {
    return (iterable: A) => {
      return takeUntil(f, iterable as any) as ReturnIterableIteratorType<A>;
    };
  }

  if (isIterable(iterable)) {
    return sync(f, iterable) as IterableIterator<IterableInfer<A>>;
  }

  if (isAsyncIterable(iterable)) {
    return async(f, iterable) as AsyncIterableIterator<IterableInfer<A>>;
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { takeUntil };
