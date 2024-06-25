import { sort } from ".";

describe("sort", () => {
  it("array", () => {
    expect(sort((a, b) => a - b, [1, 2, 3])).toEqual([1, 2, 3]);
  });
});
