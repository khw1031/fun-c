import { isNull } from "../isNull";
import { isUndefined } from "../isUndefined";
import type { Include } from "../types";

const isNil = <T>(a: T): a is Include<T, null | undefined> =>
  isUndefined(a) || isNull(a);

export { isNil };
