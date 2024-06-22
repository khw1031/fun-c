import { isAsyncIterable, isIterable } from "../_internal/utils";
import { IterableInfer, ReturnIterableIteratorType } from "../types";

function* sync<A>(length: number, iterable: Iterable<A>): IterableIterator<A> {
  const iterator = iterable[Symbol.iterator]();
  let cur = null;
  while (length-- > 0 && (cur = iterator.next()).done === false) {
    yield cur.value;
  }
}

function async<A>(
  length: number,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<A> {
  const iterator = iterable[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next(_concurrent) {
      if (length-- < 1) return { done: true, value: undefined };
      return iterator.next(_concurrent);
    },
  };
}

function take<A>(l: number, iterable: Iterable<A>): IterableIterator<A>;

function take<A>(
  l: number,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<A>;

function take<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  l: number,
): (iterable: A) => ReturnIterableIteratorType<A>;

function take<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  l: number,
  iterable?: A,
):
  | IterableIterator<IterableInfer<A>>
  | AsyncIterableIterator<IterableInfer<A>>
  | ((iterable: A) => ReturnIterableIteratorType<A>) {
  if (iterable === undefined) {
    return (iterable: A) => {
      return take(l, iterable as any) as ReturnIterableIteratorType<A>;
    };
  }

  if (isIterable<IterableInfer<A>>(iterable)) {
    return sync(l, iterable);
  }

  if (isAsyncIterable<IterableInfer<A>>(iterable)) {
    return async(l, iterable);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { take };
