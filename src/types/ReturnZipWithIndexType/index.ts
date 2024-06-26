import type { IterableInfer } from "../IterableInfer";

export type ReturnZipWithIndexType<
  T extends Iterable<unknown> | AsyncIterable<unknown>,
> =
  T extends Iterable<unknown>
    ? IterableIterator<[number, IterableInfer<T>]>
    : T extends AsyncIterable<unknown>
      ? AsyncIterableIterator<[number, IterableInfer<T>]>
      : never;
