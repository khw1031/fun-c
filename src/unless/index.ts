function unless<T, N extends T, U>(
  predicate: (input: T) => input is N,
  process: (input: Exclude<T, N>) => U,
): (input: T) => N | (U extends void ? undefined : U);

function unless<T, U>(
  predicate: (input: T) => boolean,
  process: (input: T) => U,
): (input: T) => T | (U extends void ? undefined : U);

function unless(predicate: any, process: any) {
  return (input: any) => (predicate(input) ? input : process(input));
}

export { unless };
