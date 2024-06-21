import { Awaited } from "../types";

export const isPromise = <T>(a: Promise<T> | T): a is Promise<T> => {
  if (a instanceof Promise) {
    return true;
  }

  if (
    a !== null &&
    typeof a === "object" &&
    typeof (a as any).then === "function" &&
    typeof (a as any).catch === "function"
  ) {
    return true;
  }
  return false;
};

type Pipe1 = <P, F extends (a: P extends Promise<any> ? Awaited<P> : P) => any>(
  a: P,
  f: F,
) => ReturnType<F> extends Promise<any>
  ? ReturnType<F>
  : P extends Promise<any>
    ? Promise<ReturnType<F>>
    : ReturnType<F>;

export const pipe1: Pipe1 = (a, f) => {
  return isPromise(a) ? a.then(f as any) : f(a as any);
};
