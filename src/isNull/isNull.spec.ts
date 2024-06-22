import { isNull } from ".";


describe("isNull", () => {
  test("should isNull", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
  });
});