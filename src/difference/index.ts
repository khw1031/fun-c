import { isAsyncIterable, isIterable } from "../_internal/utils";
import { identity } from "../identity";
import type { IterableInfer } from "../types";
import { differenceBy } from "../differenceBy";

function difference<T>(
  iterable1: Iterable<T>,
  iterable2: Iterable<T>,
): IterableIterator<T>;

function difference<T>(
  iterable1: AsyncIterable<T>,
  iterable2: Iterable<T>,
): AsyncIterableIterator<T>;

function difference<T>(
  iterable1: Iterable<T>,
  iterable2: AsyncIterable<T>,
): AsyncIterableIterator<T>;

function difference<T>(
  iterable1: AsyncIterable<T>,
  iterable2: AsyncIterable<T>,
): AsyncIterableIterator<T>;

function difference<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends Iterable<unknown> | AsyncIterable<unknown>,
>(
  iterable1: A,
): (
  iterable2: B,
) => A extends AsyncIterable<unknown>
  ? AsyncIterableIterator<IterableInfer<B>>
  : B extends AsyncIterable<unknown>
    ? AsyncIterableIterator<IterableInfer<B>>
    : IterableIterator<IterableInfer<B>>;

function difference<T>(
  iterable1: Iterable<T> | AsyncIterable<T>,
  iterable2?: Iterable<T> | AsyncIterable<T>,
):
  | IterableIterator<T>
  | AsyncIterableIterator<T>
  | ((
      iterable2: Iterable<T> | AsyncIterable<T>,
    ) => IterableIterator<T> | AsyncIterableIterator<T>) {
  if (iterable2 === undefined) {
    return (iterable2: any) => {
      return difference(iterable1 as any, iterable2);
    };
  }

  if (isIterable(iterable1) && isIterable(iterable2)) {
    return differenceBy(identity, iterable1, iterable2);
  }
  if (isIterable(iterable1) && isAsyncIterable(iterable2)) {
    return differenceBy(identity, iterable1, iterable2);
  }
  if (isAsyncIterable(iterable1) && isIterable(iterable2)) {
    return differenceBy(identity, iterable1, iterable2);
  }
  if (isAsyncIterable(iterable1) && isAsyncIterable(iterable2)) {
    return differenceBy(identity, iterable1, iterable2);
  }

  throw new TypeError(
    "'iterable1' and 'iterable2' must be type of Iterable or AsyncIterable",
  );
}

export { difference };
