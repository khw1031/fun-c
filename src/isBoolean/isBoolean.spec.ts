import { isBoolean } from ".";

describe("isBoolean", () => {
  test("should isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(0)).toBe(false);
  });
});
