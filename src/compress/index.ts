import { pipe } from "../pipe";
import type { ReturnIterableIteratorType } from "../types";
import { filter } from "../filter";
import { map } from "../map";
import { zip } from "../zip";

function compress<A, B>(
  selector: Array<A>,
  iterable: Iterable<B>,
): IterableIterator<B>;

function compress<A, B>(
  selector: Array<A>,
  iterable: AsyncIterable<B>,
): AsyncIterableIterator<B>;

function compress<A, B extends Iterable<unknown> | AsyncIterable<unknown>>(
  selector: Array<A>,
): (iterable: B) => ReturnIterableIteratorType<B>;

function compress<A, B extends Iterable<unknown> | AsyncIterable<unknown>>(
  selectors: Array<A>,
  iterable?: B,
):
  | ReturnIterableIteratorType<B>
  | ((iterable: B) => ReturnIterableIteratorType<B>) {
  if (iterable === undefined) {
    return (iterable: B) => {
      return compress(
        selectors,
        iterable as any,
      ) as ReturnIterableIteratorType<B>;
    };
  }

  return pipe(
    zip(selectors, iterable),
    filter(([selector]) => selector),
    map(([, value]) => value),
  ) as ReturnIterableIteratorType<B>;
}

export { compress };
