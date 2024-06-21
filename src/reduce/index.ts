import { isAsyncIterable, isIterable, pipe1 } from "../_internal/utils";
import type {
  Arrow,
  AsyncReducer,
  IterableInfer,
  ReturnValueType,
  SyncReducer,
} from "../types";

function sync<T, Acc>(
  f: SyncReducer<Acc, T>,
  acc: Acc,
  iterable: Iterable<T>,
): Acc {
  for (const a of iterable) {
    acc = f(acc, a);
  }
  return acc;
}

async function async<T, Acc>(
  f: SyncReducer<Acc, T>,
  acc: Promise<Acc>,
  iterable: AsyncIterable<T>,
) {
  for await (const a of iterable) {
    acc = await pipe1(acc, (acc) => f(acc as Acc, a));
  }
  return acc;
}

function reduce<T extends readonly [], Acc>(
  f: Arrow,
  seed: Acc,
  iterable: T,
): Acc;

function reduce<T>(f: SyncReducer<T, T>, iterable: Iterable<T>): T;

function reduce<T, Acc>(f: SyncReducer<Acc, T>, iterable: Iterable<T>): Acc;

function reduce<T, Acc>(
  f: SyncReducer<Acc, T>,
  seed: Acc,
  iterable: Iterable<T>,
): Acc;

function reduce<T>(
  f: SyncReducer<T, T>,
  iterable: AsyncIterable<T>,
): Promise<T>;

function reduce<T, Acc>(
  f: AsyncReducer<Acc, T>,
  seed: Acc | Promise<Acc>,
  iterable: AsyncIterable<T>,
): Promise<Acc>;

function reduce<T, Acc>(
  f: AsyncReducer<Acc, T>,
  iterable: AsyncIterable<T>,
): Promise<Acc>;

function reduce<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  f: AsyncReducer<IterableInfer<T>, IterableInfer<T>>,
): (iterable: T) => ReturnValueType<T>;

function reduce<T extends Iterable<unknown> | AsyncIterable<unknown>, Acc>(
  f: AsyncReducer<Acc, IterableInfer<T>>,
): (iterable: T) => ReturnValueType<T, Acc>;

function reduce<T extends Iterable<unknown> | AsyncIterable<unknown>, Acc>(
  f: SyncReducer<Acc, IterableInfer<T>>,
  seed?: Acc | Iterable<IterableInfer<T>> | AsyncIterable<IterableInfer<T>>,
  iterable?: Iterable<IterableInfer<T>> | AsyncIterable<IterableInfer<T>>,
): Acc | Promise<Acc> | ((iterable: T) => ReturnValueType<T, Acc>) {
  if (iterable === undefined) {
    if (seed === undefined) {
      return (iterable: T) =>
        reduce(f, iterable as any) as ReturnValueType<T, Acc>;
    }

    if (isIterable(seed)) {
      const iterator = seed[Symbol.iterator]();
      const { done, value } = iterator.next();
      if (done) {
        throw new TypeError(
          "'초기 값 없이 빈 이터러블에 대한 'reduce'를 수행할 수 없습니다.",
        );
      }
      return sync(f, value as Acc, {
        [Symbol.iterator]() {
          return iterator;
        },
      });
    }

    if (isAsyncIterable(seed)) {
      const iterator = seed[Symbol.asyncIterator]();
      return iterator.next().then(({ done, value }) => {
        if (done) {
          throw new TypeError(
            "'초기 값 없이 빈 이터러블에 대한 'reduce'를 수행할 수 없습니다.",
          );
        }
        return async(f, value as Promise<Acc>, {
          [Symbol.asyncIterator]() {
            return iterator;
          },
        });
      });
    }
    throw new TypeError(
      "'iterable'은 Iterable 또는 AsyncIterable 타입이어야 합니다. 'reduceLazy'를 찾고 있나요?",
    );
  }

  if (isIterable(iterable)) {
    return sync(f, seed as Acc, iterable);
  }

  if (isAsyncIterable(iterable)) {
    return async(f, Promise.resolve(seed as Acc), iterable);
  }

  throw new TypeError(
    "'iterable'은 Iterable 또는 AsyncIterable 타입이어야 합니다.",
  );
}

export { reduce };
