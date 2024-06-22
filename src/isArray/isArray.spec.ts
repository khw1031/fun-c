import { isArray } from ".";


describe("isArray", () => {
  test("should isArray", () => {
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(2)).toBe(false);
  });
});