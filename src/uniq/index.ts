import { isAsyncIterable, isIterable } from "../_internal/utils";
import { identity } from "../identity";
import type { ReturnIterableIteratorType } from "../types";
import { uniqBy } from "../uniqBy";

function uniq<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iterable: A,
): ReturnIterableIteratorType<A> {
  if (isIterable(iterable)) {
    return uniqBy(identity, iterable) as ReturnIterableIteratorType<A>;
  }

  if (isAsyncIterable(iterable)) {
    return uniqBy(identity, iterable) as ReturnIterableIteratorType<A>;
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { uniq };
