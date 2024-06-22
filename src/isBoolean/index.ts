import type { Include } from "../types";

const isBoolean = <T>(n: T): n is Include<T, boolean> => typeof n === "boolean";

export { isBoolean };
