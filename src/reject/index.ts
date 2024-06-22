import { isAsyncIterable, isIterable, pipe1 } from "../_internal/utils";
import { filter } from "../filter";
import { not } from "../not";
import {
  ExcludeObject,
  IterableInfer,
  ReturnIterableIteratorType,
} from "../types";

function reject<A, B extends A>(
  f: (a: A) => a is B,
  iterable: Iterable<A>,
): IterableIterator<A extends object ? ExcludeObject<A, B> : Exclude<A, B>>;

function reject<A, B extends A>(
  f: (a: A) => a is B,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<
  A extends object ? ExcludeObject<A, B> : Exclude<A, B>
>;

function reject<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B extends IterableInfer<A>,
  C extends B,
  R = B extends object ? ExcludeObject<B, C> : Exclude<B, C>,
>(
  f: (a: IterableInfer<A>) => a is C,
): (
  iterable: A,
) => A extends AsyncIterable<any>
  ? AsyncIterableIterator<R>
  : IterableIterator<R>;

function reject<A, B = unknown>(
  f: (a: A) => B,
  iterable: Iterable<A>,
): IterableIterator<A>;

function reject<A, B = unknown>(
  f: (a: A) => B,
  iterable: AsyncIterable<A>,
): AsyncIterableIterator<A>;

function reject<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B = unknown,
>(
  f: (a: IterableInfer<A>) => B,
  iterable?: A,
): (iterable: A) => ReturnIterableIteratorType<A, IterableInfer<A>>;

function reject<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B = unknown,
>(
  f: (a: IterableInfer<A>) => B,
  iterable?: A,
):
  | IterableIterator<IterableInfer<A>>
  | AsyncIterableIterator<IterableInfer<A>>
  | ((iterable: A) => ReturnIterableIteratorType<A, IterableInfer<A>>) {
  if (iterable === undefined) {
    return (iterable: A): ReturnIterableIteratorType<A, IterableInfer<A>> => {
      return reject(f, iterable as any) as ReturnIterableIteratorType<
        A,
        IterableInfer<A>
      >;
    };
  }

  if (isIterable<IterableInfer<A>>(iterable)) {
    return filter((a) => pipe1(f(a), not), iterable);
  }

  if (isAsyncIterable<IterableInfer<A>>(iterable)) {
    return filter((a) => pipe1(f(a), not), iterable);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { reject };
