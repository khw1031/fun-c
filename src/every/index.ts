import { isAsyncIterable, isIterable } from "../_internal/utils";
import { map } from "../map";
import { takeUntil } from "../takeUntil";
import { not } from "../not";
import { pipe } from "../pipe";
import { reduce } from "../reduce";
import type { Arrow, ReturnValueType, IterableInfer } from "../types";

function every<A extends readonly []>(f: Arrow, iterable: A): true;

// prettier-ignore
function every<A, B = unknown>(
  f: (a: A) => B,
  iterable: Iterable<A>,
): boolean;

function every<A, B = unknown>(
  f: (a: A) => B,
  iterable: AsyncIterable<A>,
): Promise<boolean>;

function every<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B = unknown,
>(f: (a: IterableInfer<A>) => B): (a: A) => ReturnValueType<A, boolean>;

function every<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B = unknown,
>(
  f: (a: IterableInfer<A>) => B,
  iterable?: A,
): boolean | Promise<boolean> | ((iterable: A) => ReturnValueType<A, boolean>) {
  if (iterable === undefined) {
    return (iterable: A) => {
      return every(f, iterable as any) as ReturnValueType<A, boolean>;
    };
  }

  if (isIterable<IterableInfer<A>>(iterable)) {
    return pipe(
      map(f, iterable),
      takeUntil(not),
      (acc) =>
        reduce(
          (a: boolean, b: boolean) => a && b,
          true,
          acc as Iterable<boolean>,
        ),
      (a) => a ?? true,
      Boolean,
    );
  }

  if (isAsyncIterable<IterableInfer<A>>(iterable)) {
    return pipe(
      map(f, iterable),
      takeUntil(not),
      (acc) =>
        reduce(
          (a: boolean, b: boolean) => a && b,
          true,
          acc as AsyncIterable<boolean>,
        ),
      (a) => a ?? true,
      Boolean,
    );
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { every };
