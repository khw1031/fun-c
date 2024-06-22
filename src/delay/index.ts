import { isPromise } from "../_internal/utils";

function delay(wait: number): Promise<void>;
function delay<T>(wait: number, value: T): Promise<T>;
function delay<T>(wait: number, value?: T): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    if (isPromise(value)) {
      value.catch(reject);
    }

    setTimeout(() => {
      resolve(value);
    }, wait);
  });
}

export { delay };
