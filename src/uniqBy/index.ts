import { isAsyncIterable, isIterable, pipe1 } from "../_internal/utils";
import { pipe } from "../pipe";
import { filter } from "../filter";
import type { IterableInfer, ReturnIterableIteratorType } from "../types";

function uniqBy<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A>,
): IterableIterator<A>;

function uniqBy<A, B>(
  f: (a: A) => B,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<A>;

function uniqBy<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  f: (a: IterableInfer<A>) => B,
  iterable?: A,
): (iterable: A) => ReturnIterableIteratorType<A>;

function uniqBy<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  f: (a: IterableInfer<A>) => B,
  iterable?: A,
):
  | IterableIterator<A>
  | AsyncIterableIterator<A>
  | ((iterable: A) => ReturnIterableIteratorType<A>) {
  if (iterable === undefined) {
    return (iterable) => {
      return uniqBy(f, iterable as any) as ReturnIterableIteratorType<A>;
    };
  }

  const s = new Set();
  const checkAndAdd = (b: B) => {
    if (s.has(b)) {
      return false;
    }

    s.add(b);
    return true;
  };

  if (isIterable(iterable)) {
    return pipe(
      iterable,
      filter((a) => pipe1(f(a), checkAndAdd)),
    ) as IterableIterator<A>;
  }

  if (isAsyncIterable(iterable)) {
    return pipe(
      iterable,
      filter((a) => pipe1(f(a), checkAndAdd)),
    ) as AsyncIterableIterator<A>;
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { uniqBy };
