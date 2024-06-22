import { isObject } from ".";


describe("isObject", () => {
  test("should isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject(2)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject([])).toBe(true);
    expect(isObject(new Date())).toBe(true);
  });
});