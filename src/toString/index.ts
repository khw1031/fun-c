import { isNil } from "../isNil";
import { isObject } from "../isObject";

// prettier-ignore
export const toString = <T>(value: T): string =>
isNil(value)
  ? ""
  : isObject(value)
  ? JSON.stringify(value)
  : (value as any).toString();
