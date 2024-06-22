import { isNil } from ".";

describe("isNil", () => {
  test("should isNil", () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(2)).toBe(false);
  });
});
