import { isNumber } from ".";

describe("isNumber", () => {
  test("1은 숫자형이다.", () => {
    expect(isNumber(1)).toBe(true);
  });
  test("'1'은 숫자형이 아니다.", () => {
    expect(isNumber("1")).toBe(false);
  });
});
