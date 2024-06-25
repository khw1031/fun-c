function ifElse<T, U>(
  predicate: (input: T) => boolean,
  processWhenTruthy: (input: T) => U,
  processWhenFalsy: (input: T) => U,
): (input: T) => U extends void ? undefined : U;

function ifElse(predicate: any, processWhenTruthy: any, processWhenFalsy: any) {
  return (input: any) =>
    predicate(input) ? processWhenTruthy(input) : processWhenFalsy(input);
}

export { ifElse };
