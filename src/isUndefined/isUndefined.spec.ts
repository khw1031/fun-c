import { isUndefined } from ".";


describe("isUndefined", () => {
  test("should isUndefined", () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(2)).toBe(false);
  });
});