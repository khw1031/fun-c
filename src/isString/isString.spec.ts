import { isString } from ".";

describe("isString", () => {
  test("1은 문자열이 아니다.", () => {
    expect(isString(1)).toBe(false);
  });

  test("'1'은 문자열이다.", () => {
    expect(isString("1")).toBe(true);
  });
});
