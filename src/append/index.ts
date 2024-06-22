import { isAsyncIterable, isIterable, isPromise } from "../_internal/utils";
import type { Awaited, ReturnIterableIteratorType } from "../types";
import { concurrent, isConcurrent } from "../concurrent";

function* sync<A>(a: A, iterable: Iterable<A>) {
  yield* iterable;
  yield a;
}

function asyncSequential<A>(
  a: Promise<A>,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<A> {
  const iterator = iterable[Symbol.asyncIterator]();
  let finished = false;
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      if (finished) {
        return { done: true, value: undefined };
      }
      const { value, done } = await iterator.next();
      if (finished) {
        return { done: true, value: undefined };
      }
      if (done) {
        finished = true;
        return { done: false, value: await a };
      } else {
        return { done, value };
      }
    },
  };
}

function async<A>(
  a: Promise<A>,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<A> {
  let iterator: AsyncIterator<A> | null = null;
  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next(_concurrent: any) {
      if (iterator === null) {
        iterator = isConcurrent(_concurrent)
          ? asyncSequential(a, concurrent(_concurrent.length, iterable))
          : asyncSequential(a, iterable);
      }
      return iterator.next(_concurrent);
    },
  };
}

function append<A, B extends Iterable<A> | AsyncIterable<Awaited<A>>>(
  a: A,
): (iterable: B) => ReturnIterableIteratorType<B, Awaited<A>>;

function append<A>(a: A, iterable: Iterable<A>): IterableIterator<A>;

function append<A>(
  a: A | Promise<A>,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<A>;

function append<A, B extends Iterable<A> | AsyncIterable<A>>(
  a: A,
  iterable?: Iterable<A> | AsyncIterable<A>,
):
  | IterableIterator<A>
  | AsyncIterableIterator<A>
  | ((iterable: B) => ReturnIterableIteratorType<B, A>) {
  if (iterable === undefined) {
    return (iterable: B) =>
      append(a, iterable as any) as ReturnIterableIteratorType<B, A>;
  }

  if (isAsyncIterable(iterable)) {
    return async(isPromise(a) ? a : Promise.resolve(a), iterable);
  }

  if (isIterable(iterable)) {
    return sync(a, iterable);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { append };
