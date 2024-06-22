import { isArray } from "../isArray";
import { isNil } from "../isNil";

const isEmpty = <T>(value: T): boolean => {
  if (isNil(value)) return true; // if value is null or undefined.

  if (
    typeof value === "object" &&
    (value as object)["constructor"] === Object &&
    Object.getOwnPropertyNames(value).length === 0
  )
    return true; // if value is a literal object and have no property or method.

  if (isArray(value) && value.length === 0) return true; // if value have no item.

  if (value === "") return true;

  if (value instanceof Map || value instanceof Set) return value.size === 0; // if value is a Map or Set and have no item.

  return false;
};

export { isEmpty };
