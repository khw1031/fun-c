import type { Include } from "../types";

const isObject = <T>(a: T): a is Include<T, object> => {
  const type = typeof a;
  return a != null && (type === "object" || type === "function");
};

export { isObject };
