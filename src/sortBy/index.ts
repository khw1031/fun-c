import { isAsyncIterable, isIterable } from "../_internal/utils";
import { isArray } from "../isArray";
import { sort } from "../sort";
import { IterableInfer, ReturnValueType } from "../types";

function sortBy(f: (a: any) => unknown, iterable: readonly []): any[];

function sortBy<T>(f: (a: T) => unknown, iterable: Iterable<T>): T[];

function sortBy<T>(
  f: (a: T) => unknown,
  iterable: AsyncIterable<T>,
): Promise<T[]>;

function sortBy<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  f: (a: IterableInfer<T>) => unknown,
): (iterable: T) => ReturnValueType<T, IterableInfer<T>[]>;

function sortBy<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  f: (a: IterableInfer<T>) => unknown,
  iterable?: T,
):
  | IterableInfer<T>[]
  | Promise<IterableInfer<T>[]>
  | ((iterable: T) => ReturnValueType<T, IterableInfer<T>[]>) {
  if (iterable === undefined) {
    return (iterable: T) =>
      sortBy(f, iterable as any) as ReturnValueType<T, IterableInfer<T>[]>;
  }

  const _sortBy = (a: IterableInfer<T>, b: IterableInfer<T>) => {
    const aa = f(a) as number;
    const bb = f(b) as number;
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  };

  if (isArray(iterable)) {
    return (iterable as any).sort(_sortBy);
  }

  if (isIterable(iterable)) {
    return sort(_sortBy, iterable as Iterable<IterableInfer<T>>);
  }

  if (isAsyncIterable(iterable)) {
    return sort(_sortBy, iterable as AsyncIterable<IterableInfer<T>>);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { sortBy };