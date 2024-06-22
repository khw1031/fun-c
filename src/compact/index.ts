import { isAsyncIterable, isIterable, isNotNullable } from "../_internal/utils";
import type { IterableInfer, ReturnIterableIteratorType } from "../types";
import { filter } from "../filter";

function compact<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  iterable: T,
): ReturnIterableIteratorType<T, NonNullable<IterableInfer<T>>>;

function compact<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  iterable: T,
) {
  if (isIterable(iterable)) {
    return filter(isNotNullable, iterable);
  }

  if (isAsyncIterable(iterable)) {
    return filter(isNotNullable, iterable);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { compact };
