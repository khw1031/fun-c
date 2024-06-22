import { isAsyncIterable, isIterable } from "../_internal/utils";
import { take } from "../take";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

type HeadReturnType<T> = T extends readonly [a: infer H, ...rest: any[]]
  ? H
  : T extends readonly never[]
    ? undefined
    : T extends AsyncIterable<infer U>
      ? Promise<U | undefined>
      : T extends Iterable<infer U>
        ? U | undefined
        : never;

function head<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  iterable: T,
): HeadReturnType<T>;

function head<A>(iterable: Iterable<A> | AsyncIterable<A>) {
  if (isIterable(iterable)) {
    return pipe(take(1, iterable), toArray, ([a]) => a);
  }
  if (isAsyncIterable(iterable)) {
    return pipe(take(1, iterable), toArray, ([a]) => a);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { head };
