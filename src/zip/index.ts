import { isAsyncIterable, isIterable, toIterator } from "../_internal/utils";
import { every } from "../every";
import { pipe } from "../pipe";
import { toArray } from "../toArray";
import type { ReturnZipType, UniversalIterable } from "../types";
import { map } from "../map";
import { range } from "../range";
import { takeWhile } from "../takeWhile";
import { toAsync } from "../toAsync";

function sync(
  iterable: Iterable<Iterable<unknown>>,
): IterableIterator<Iterable<unknown>> {
  const iterators = toArray(
    map((a) => toIterator(a), iterable as Iterable<Iterable<unknown>>),
  );

  return pipe(
    range(Infinity),
    map(() => toArray(map((it) => it.next(), iterators))),
    takeWhile(every((cur2) => !cur2.done)),
    map((cur1) => toArray(map((cur2) => cur2.value, cur1))),
  );
}

function async(
  iterable: Iterable<UniversalIterable>,
): AsyncIterableIterator<UniversalIterable> {
  const iterators = toArray(map(toIterator, iterable as any));

  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next(_concurrent) {
      const headIterators = await pipe(
        toAsync(iterators),
        map((it) => it.next(_concurrent)),
        toArray,
      );

      const hasDone = headIterators.some((it) => it.done);
      if (hasDone) {
        return { done: true, value: undefined };
      }

      return {
        done: false,
        value: headIterators.map((it) => it.value),
      };
    },
  };
}

function zip<T extends UniversalIterable, TS extends UniversalIterable[]>(
  a: T,
): (...args: TS) => ReturnZipType<[T, ...TS]>;

// prettier-ignore
function zip<T extends UniversalIterable[]>(
  ...args: T
): ReturnZipType<[...T]>;

function zip<TS extends UniversalIterable[]>(
  ...iterables: TS[]
): ReturnZipType<TS> | ((...iterables: TS[]) => ReturnZipType<TS>) {
  if (iterables.length < 2) {
    return (...iterables2: UniversalIterable[]) => {
      return zip(...iterables, ...iterables2) as ReturnZipType<TS>;
    };
  }

  if (iterables.some((a) => !isIterable(a) && !isAsyncIterable(a))) {
    throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
  }

  const hasAsyncIterable = iterables.some((iterable) =>
    isAsyncIterable(iterable),
  );

  if (hasAsyncIterable) {
    return async(iterables) as ReturnZipType<TS>;
  }

  return sync(iterables as Iterable<Iterable<unknown>>[]) as ReturnZipType<TS>;
}

export { zip };
