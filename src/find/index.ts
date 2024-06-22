import { isAsyncIterable, isIterable } from "../_internal/utils";
import { head } from "../head";
import { filter } from "../filter";
import type { IterableInfer, ReturnValueType } from "../types";

function find<T>(f: (a: T) => unknown, iterable: Iterable<T>): T | undefined;

function find<T>(
  f: (a: T) => unknown,
  iterable: AsyncIterable<T>,
): Promise<T | undefined>;

function find<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  f: (a: IterableInfer<T>) => unknown,
  iterable?: T,
): (iterable: T) => ReturnValueType<T, IterableInfer<T> | undefined>;

function find<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  f: (a: IterableInfer<T>) => unknown,
  iterable?: T,
):
  | (IterableInfer<T> | undefined)
  | Promise<IterableInfer<T> | undefined>
  | ((iterable: T) => ReturnValueType<T, IterableInfer<T> | undefined>) {
  if (iterable === undefined) {
    return (iterable: T) =>
      find(f, iterable) as ReturnValueType<T, IterableInfer<T> | undefined>;
  }
  if (isIterable<IterableInfer<T>>(iterable)) {
    return head(filter(f, iterable));
  }
  if (isAsyncIterable<IterableInfer<T>>(iterable)) {
    return head(filter(f, iterable));
  }
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { find };
