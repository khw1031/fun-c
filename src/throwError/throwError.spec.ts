import { throwError } from ".";
import { isNumber } from "../isNumber";
import { pipe } from "../pipe";
import { unless } from "../unless";

describe("throwError", () => {
  it("toError 함수를 호출하여 에러를 던진다", () => {
    const input = "input is string";
    const toError = (s: string) => new Error(s);
    const test = throwError(toError);
    expect(() => test(input)).toThrowError(input);
  });

  it("throw in pipe", () => {
    try {
      pipe(
        "0",
        unless(
          isNumber,
          throwError((input) => new Error(`input is ${input}`)),
        ),
      );
    } catch (error: any) {
      expect(error.message).toBe("input is 0");
    }
  });

  it("throw error", () => {
    try {
      throwError((input) => Error(`input is ${input}`))(0);
    } catch (error: any) {
      expect(error.message).toBe("input is 0");
    }
  });
});
