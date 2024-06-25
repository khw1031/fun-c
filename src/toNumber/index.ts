import { filter } from "../filter";
import { head } from "../head";
import { isNumber } from "../isNumber";
import { map } from "../map";
import { pipe } from "../pipe";
import { toString } from "../toString";

const isCurrencyFormat = (str: string) =>
  /^\d{1,3}(,\d{3})*(\.\d+)?$/.test(str);
const isMinusCurrentyFormat = (str: string) =>
  /^-\d{1,3}(,\d{3})*(\.\d+)?$/.test(str);

const currencyToNumber = (str: string) => +str.replace(/,/g, "");

export const toNumber = <T>(value: T): number => {
  if (isNumber(value)) {
    return value;
  }
  return (
    pipe(
      [value],
      map(toString),
      filter(
        (numStr) => isCurrencyFormat(numStr) || isMinusCurrentyFormat(numStr),
      ),
      map(currencyToNumber),
      map((n) => +n),
      head,
    ) ?? NaN
  );
};
