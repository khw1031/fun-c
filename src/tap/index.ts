import { isPromise } from "../_internal/utils";
import type { Awaited } from "../types";

function tap<T, U>(
  f: (arg: Awaited<T>) => U,
  v: T,
): U extends Promise<any> ? Promise<Awaited<T>> : T;

function tap<T, U>(
  f: (arg: Awaited<T>) => U,
): (v: T) => U extends Promise<any> ? Promise<Awaited<T>> : T;

function tap<T, U>(
  f: (arg: Awaited<T>) => U,
  v?: T,
):
  | T
  | Promise<T>
  | ((v: T) => U extends Promise<any> ? Promise<Awaited<T>> : T) {
  if (v === undefined) {
    return (v: T) => tap(f, v);
  }

  const res = isPromise(v) ? v.then(f as any) : (f(v as Awaited<T>) as any);
  if (isPromise(res)) {
    return res.then(() => v);
  }

  return v;
}

export { tap };
