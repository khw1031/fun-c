import { isAsyncIterable, isIterable } from "../_internal/utils";
import type { IterableInfer, ReturnConcatType } from "../types";

function* sync<A>(a: Iterable<A>, b: Iterable<A>): IterableIterator<A> {
  yield* a;
  yield* b;
}

function async<A>(
  a: AsyncIterable<A>,
  b: AsyncIterable<A>,
): AsyncIterableIterator<A> {
  let leftDone = false;
  const leftIterator = a[Symbol.asyncIterator]();
  const rightIterator = b[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next(_concurrent: any) {
      const iterator = leftDone ? rightIterator : leftIterator;
      const { done, value } = await iterator.next(_concurrent);
      if (done) {
        if (iterator === leftIterator) {
          leftDone = true;
        }
        return rightIterator.next(_concurrent);
      } else {
        return { done, value };
      }
    },
  };
}

function toAsyncIterable<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return iterable;
  }

  const iterator = iterable[Symbol.iterator]() as unknown as AsyncIterator<T>;
  return {
    [Symbol.asyncIterator]() {
      return iterator;
    },
  };
}

function concat<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(iterable1: A, iterable2: B): ReturnConcatType<A, B>;

function concat<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(iterable1: A): (iterable2: B) => ReturnConcatType<A, B>;

function concat<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iterable1: A,
  iterable2?: B,
):
  | IterableIterator<IterableInfer<A> | IterableInfer<B>>
  | AsyncIterableIterator<IterableInfer<A> | IterableInfer<B>>
  | ((iterable2: B) => ReturnConcatType<A, B>) {
  if (iterable2 === undefined) {
    return (iterable2: B): ReturnConcatType<A, B> => {
      return concat(iterable1, iterable2) as ReturnConcatType<A, B>;
    };
  }

  if (isAsyncIterable(iterable1) || isAsyncIterable(iterable2)) {
    return async(
      toAsyncIterable(iterable1),
      toAsyncIterable(iterable2),
    ) as ReturnConcatType<A, B>;
  }

  if (isIterable(iterable1) && isIterable(iterable2)) {
    return sync(iterable1, iterable2) as ReturnConcatType<A, B>;
  }

  throw new TypeError(
    "'iterable1','iterable2' must be type of Iterable or AsyncIterable",
  );
}

export { concat };
