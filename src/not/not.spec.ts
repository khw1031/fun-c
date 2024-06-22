import { not } from ".";

describe("not", () => {
  test("should not", () => {
    expect(not(true)).toEqual(false);
  });
});
