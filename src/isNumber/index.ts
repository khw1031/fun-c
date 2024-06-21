import type { Include } from "../types";

export const isNumber = <T>(n: T): n is Include<T, number> =>
  typeof n === "number";
