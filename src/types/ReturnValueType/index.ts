import type { Awaited } from "../Awaited";
import type { IterableInfer } from "../IterableInfer";

export type ReturnValueType<
  T extends Iterable<unknown> | AsyncIterable<unknown>,
  R = IterableInfer<T>,
> =
  T extends AsyncIterable<unknown>
    ? Promise<Awaited<R>>
    : T extends Iterable<unknown>
      ? Awaited<R>
      : never;
