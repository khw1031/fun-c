import { filter } from "../filter";
import { head } from "../head";
import { map } from "../map";
import { pipe } from "../pipe";
import { toString } from "../toString";

const isCurrencyForamt = (str: string) =>
  /^\d{1,3}(,\d{3})*(\.\d+)?$/.test(str);

const currencyToNumber = (str: string) => +str.replace(/,/g, "");

export const toNumber = <T>(value: T): number => {
  return (
    pipe(
      [value],
      map(toString),
      filter(isCurrencyForamt),
      map(currencyToNumber),
      map((n) => +n),
      head,
    ) ?? NaN
  );
};
