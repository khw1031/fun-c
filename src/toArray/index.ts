import { isAsyncIterable, isIterable } from "../_internal/utils";
import { ReturnArrayType } from "../types";

async function async<A>(iterable: AsyncIterable<A>): Promise<A[]> {
  const res: A[] = [];
  for await (const item of iterable) {
    res.push(item);
  }
  return res;
}

function toArray<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A,
): ReturnArrayType<A>;

function toArray<A>(iter: AsyncIterable<A> | Iterable<A>) {
  if (isAsyncIterable(iter)) {
    return async(iter);
  } else if (isIterable(iter)) {
    return Array.from(iter);
  } else {
    return [] as A[];
  }
}

export { toArray };
