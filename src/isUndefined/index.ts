import type { Include } from "../types";

const isUndefined = <T>(a: T): a is Include<T, undefined> => a === undefined;

export { isUndefined };
