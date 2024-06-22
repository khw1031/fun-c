import { AsyncFunctionException } from "../_internal/error";
import { isAsyncIterable, isIterable, isPromise } from "../_internal/utils";
import { IterableInfer, ReturnIterableIteratorType } from "../types";

function sync<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A>,
): IterableIterator<B> {
  const iterator = iterable[Symbol.iterator]();

  return {
    next() {
      const { done, value } = iterator.next();
      if (done) {
        return {
          done: true,
          value: undefined,
        };
      }

      const res = f(value);
      if (isPromise(res)) {
        throw new AsyncFunctionException();
      }
      return {
        done: false,
        value: res,
      };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}

function async<A, B>(
  f: (a: A) => B,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<B> {
  const iterator = iterable[Symbol.asyncIterator]();

  return {
    async next(_concurrent) {
      const { done, value } = await iterator.next(_concurrent);
      if (done) return { done, value } as IteratorReturnResult<void>;
      return {
        done: false,
        value: await f(value),
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

function map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B>;

function map<A, B>(
  f: (a: A) => B,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<Awaited<B>>;

function map<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  f: (a: IterableInfer<A>) => B,
): (iterable: A) => ReturnIterableIteratorType<A, B>;

function map<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  f: (a: IterableInfer<A>) => B,
  iterable?: A,
):
  | IterableIterator<B>
  | AsyncIterableIterator<B>
  | ((iterable: A) => ReturnIterableIteratorType<A, B>) {
  if (iterable === undefined) {
    return (iterable: A): ReturnIterableIteratorType<A, B> => {
      return map(f, iterable as any) as ReturnIterableIteratorType<A, B>;
    };
  }

  if (isIterable<IterableInfer<A>>(iterable)) {
    return sync(f, iterable);
  }

  if (isAsyncIterable<IterableInfer<A>>(iterable)) {
    return async(f, iterable);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { map };
