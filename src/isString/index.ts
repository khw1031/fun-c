import { Include } from "../types";

export const isString = <T>(s: T): s is Include<TemplateStringsArray, string> =>
  typeof s === "string";
