import type { Include } from "../types";

const isArray = <T>(a: T): a is Include<T, unknown[] | Readonly<unknown[]>> =>
  Array.isArray(a);

export { isArray };
