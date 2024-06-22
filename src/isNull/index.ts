import type { Include } from "../types";

const isNull = <T>(input: T): input is Include<T, null> => input === null;

export { isNull };
