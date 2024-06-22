import { isPromise } from "../_internal/utils";

function toAsync<T>(iter: Iterable<T | Promise<T>>): AsyncIterableIterator<T> {
  const iterator = iter[Symbol.iterator]();
  return {
    async next() {
      const { value, done } = iterator.next();
      if (isPromise(value)) {
        return value.then((value) => ({ done, value }));
      } else {
        return { done, value };
      }
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

export { toAsync };
