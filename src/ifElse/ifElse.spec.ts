import { ifElse } from ".";
import { isNumber } from "../isNumber";
import { pipe } from "../pipe";

describe("ifElse", () => {
  it("predicate가 true이면 processWhenTruthy를 호출한다.", () => {
    const result = pipe(
      0,
      ifElse(
        isNumber,
        (input) => `${input} is number`,
        (input) => `${input} is not number`,
      ),
    );
    expect(result).toBe("0 is number");
  });

  it("predicate가 false이면 processWhenFalsy를 호출한다.", () => {
    const result = pipe(
      "0",
      ifElse(
        isNumber,
        (input) => `${input} is number`,
        (input) => `${input} is not number`,
      ),
    );
    expect(result).toBe("0 is not number");
  });
});
