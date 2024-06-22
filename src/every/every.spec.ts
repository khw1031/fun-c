import { every } from ".";

describe("every", () => {
  test("should every", () => {
    expect(every((a) => a % 2 === 0, [2, 4, 6, 8, 10])).toBe(true);
  });
});
