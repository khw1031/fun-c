import { isAsyncIterable, isIterable } from "../_internal/utils";
import { reduce } from "../reduce";
import type { Key, IterableInfer, ReturnValueType } from "../types";

function fromEntries<
  U extends [Key, any] | readonly [Key, any],
  T extends Iterable<U> | AsyncIterable<U>,
>(
  iterable: T,
): ReturnValueType<
  T,
  {
    [K in IterableInfer<T> as K[0]]: K[1];
  }
>;
function fromEntries<T extends [Key, any]>(
  iter: Iterable<T> | AsyncIterable<T>,
) {
  const obj: Record<Key, any> = {};
  const reducer = (obj: Record<Key, any>, [key, val]: T): Record<Key, any> => {
    obj[key] = val;
    return obj;
  };
  if (isAsyncIterable(iter)) {
    return reduce(reducer, obj, iter);
  } else if (isIterable(iter)) {
    return reduce(reducer, obj, iter);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { fromEntries };
