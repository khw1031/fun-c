import { identity } from "../identity";

function throwIf<T, N extends T>(
  predicate: (input: T) => input is N,
  err?: (input: N) => unknown,
): (input: T) => Exclude<T, N>;

function throwIf<T>(
  predicate: (input: T) => boolean,
  err?: (input: T) => unknown,
): (input: T) => T;

function throwIf<T>(
  predicate: (input: T) => boolean,
  err: (input: unknown) => unknown = identity,
) {
  return (input: T) => {
    if (predicate(input)) throw err(input);
    return input;
  };
}

export { throwIf };