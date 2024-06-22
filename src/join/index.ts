import { isAsyncIterable, isIterable } from "../_internal/utils";
import { isString } from "../isString";
import { reduce } from "../reduce";

type ReturnJoinType<T extends Iterable<unknown> | AsyncIterable<unknown>> =
  T extends Iterable<unknown>
    ? string
    : T extends AsyncIterable<unknown>
      ? Promise<string>
      : never;

function sync<A>(sep: string, iterable: Iterable<A>) {
  const res = reduce(
    (a: string, b) => (a == "" ? `${b}` : `${a}${sep}${b}`),
    "",
    iterable,
  );
  if (res == null) {
    return "";
  }

  return isString(res) ? res : String(res);
}

function async<A>(sep: string, iterable: AsyncIterable<A>) {
  return reduce(
    (a: string, b) => (a == "" ? `${b}` : `${a}${sep}${b}`),
    "",
    iterable,
  ).then((res) => {
    if (res == null) {
      return "";
    }

    return isString(res) ? res : String(res);
  });
}

function join<A extends readonly []>(sep: string, iterable: A): "";

function join<A>(sep: string, iterable: Iterable<A>): string;

function join<A>(sep: string, iterable: AsyncIterable<A>): Promise<string>;

function join<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  sep: string,
): (iterable: A) => ReturnJoinType<A>;

function join<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  sep: string,
  iterable?: A,
): string | Promise<string> | ((iterable: A) => ReturnJoinType<A>) {
  if (iterable === undefined) {
    return (iterable: A): ReturnJoinType<A> => {
      return join(sep, iterable as any) as ReturnJoinType<A>;
    };
  }

  if (Array.isArray(iterable) && iterable.length === 0) return "";

  if (isIterable(iterable)) {
    return sync(sep, iterable);
  }

  if (isAsyncIterable(iterable)) {
    return async(sep, iterable);
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}

export { join };
