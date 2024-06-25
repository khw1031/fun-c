import { throwIf } from ".";
import { isNumber } from "../isNumber";

describe("throwIf", () => {
  it("predicate가 true이면 에러를 던진다", () => {
    const input = 100;
    const predicate = isNumber;
    const test = throwIf(predicate, (n) => `${n} is number`);
    expect(() => test(input)).toThrowError(`100 is number`);
  });
  it("predicate가 false이면 input 값을 반환한다.", () => {
    const input = "100";
    const predicate = isNumber;
    const test = throwIf(predicate, (n) => `${n} is number`);
    expect(test(input)).toBe("100");
  });
});
