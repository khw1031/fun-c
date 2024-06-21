import { isPromise } from "../_internal/utils";
import { isNumber } from "../isNumber";
import { isString } from "../isString";

import type { Awaited } from "../types";

// prettier-ignore
type ReturnAddType<T, A extends T, B extends T> =
  | [A] extends [Promise<Awaited<T>>]
  ? Promise<Awaited<T>>
  : [B] extends [Promise<Awaited<T>>]
  ? Promise<Awaited<T>>
  : [Awaited<T>];

function sync(a: number | string, b: number | string) {
  if (isNumber(a) && isNumber(b)) {
    return a + b;
  }

  if (isString(a) && isString(b)) {
    return a + b;
  }

  throw new TypeError("'a' or 'b'는 number 또는 string이어야 합니다.");
}

async function async(a: Promise<number | string>, b: Promise<number | string>) {
  return sync(await a, await b);
}

function add<
  A extends number | Promise<number>,
  B extends number | Promise<number>,
>(a: A, b: B): ReturnAddType<number | Promise<number>, A, B>;
function add<
  A extends string | Promise<string>,
  B extends string | Promise<string>,
>(a: A, b: B): ReturnAddType<string | Promise<string>, A, B>;

function add<
  A extends number | Promise<number>,
  B extends number | Promise<number>,
>(a: A): (b: B) => ReturnAddType<number | Promise<number>, A, B>;

function add<
  A extends string | Promise<string>,
  B extends string | Promise<string>,
>(a: A): (b: B) => ReturnAddType<string | Promise<string>, A, B>;

function add<
  A extends string | number | Promise<string | number>,
  B extends string | number | Promise<string | number>,
>(a: A, b?: B): number | string | Promise<string | number> | ((b: B) => any) {
  if (b === undefined) {
    return (b: B) => {
      return add(a as any, b as any);
    };
  }
  if (isPromise(a) || isPromise(b)) {
    return async(Promise.resolve(a), Promise.resolve(b));
  }
  return sync(a, b);
}

export { add };
