import { isAsyncIterable, isIterable } from "../_internal/utils";
import { map } from "../map";
import { zip } from "../zip";

function zipWith<A, B, C>(
  f: (a: A, b: B) => C,
  iterable1: Iterable<A>,
  iterable2: Iterable<B>,
): IterableIterator<C>;

function zipWith<A, B, C>(
  f: (a: A, b: B) => C,
  iterable1: Iterable<A>,
  iterable2: AsyncIterable<B>,
): AsyncIterableIterator<C>;

function zipWith<A, B, C>(
  f: (a: A, b: B) => C,
  iterable1: AsyncIterable<A>,
  iterable2: Iterable<B>,
): AsyncIterableIterator<C>;

function zipWith<A, B, C>(
  f: (a: A, b: B) => C,
  iterable1: AsyncIterable<A>,
  iterable2: AsyncIterable<B>,
): AsyncIterableIterator<C>;

function zipWith<A, B, C>(
  f: (a: A, b: B) => C,
  iterable1: Iterable<A> | AsyncIterable<A>,
  iterable2: Iterable<B> | AsyncIterable<B>,
): IterableIterator<C> | AsyncIterableIterator<C> {
  if (isIterable(iterable1) && isIterable(iterable2)) {
    return map(([a, b]) => f(a, b), zip(iterable1, iterable2));
  }
  if (isIterable(iterable1) && isAsyncIterable(iterable2)) {
    return map(([a, b]) => f(a, b), zip(iterable1, iterable2));
  }
  if (isAsyncIterable(iterable1) && isIterable(iterable2)) {
    return map(([a, b]) => f(a, b), zip(iterable1, iterable2));
  }
  if (isAsyncIterable(iterable1) && isAsyncIterable(iterable2)) {
    return map(([a, b]) => f(a, b), zip(iterable1, iterable2));
  }

  throw new TypeError(
    "'iterable1' and 'iterable2' must be type of Iterable or AsyncIterable",
  );
}

export { zipWith };
