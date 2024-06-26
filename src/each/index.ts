import { isAsyncIterable, isIterable, isPromise } from "../_internal/utils";
import { IterableInfer, ReturnValueType } from "../types";

function sync<A, B = unknown>(f: (a: A) => B, iterable: Iterable<A>): void {
  for (const a of iterable) {
    f(a);
  }
}

async function async<A, B = unknown>(
  f: (a: A) => B,
  iterable: AsyncIterable<A>,
): Promise<void> {
  for await (const item of iterable) {
    const value = f(item);
    if (isPromise(value)) {
      await value;
    }
  }
}

function each<A, B = unknown>(f: (a: A) => B, iterable: Iterable<A>): void;

function each<A, B = unknown>(
  f: (a: A) => B,
  iterable: AsyncIterable<A>,
): Promise<void>;

function each<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  B = unknown,
>(f: (a: IterableInfer<A>) => B): (iterable: A) => ReturnValueType<A, void>;

function each<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  f: (a: IterableInfer<A>) => B,
  iterable?: A,
): void | Promise<void> | ((iterable: A) => ReturnValueType<A, void>) {
  if (iterable === undefined) {
    return (iterable: A): ReturnValueType<A, void> => {
      return each(f, iterable as any) as ReturnValueType<A, void>;
    };
  }

  if (isIterable<IterableInfer<A>>(iterable)) {
    return sync(f, iterable);
  }

  if (isAsyncIterable<IterableInfer<A>>(iterable)) {
    return async(f, iterable);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { each };
