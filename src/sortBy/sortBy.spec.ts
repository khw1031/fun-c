import { sortBy } from ".";

describe("sortBy", () => {
  it("array", () => {
    expect(sortBy((a) => a, [1, 2, 3])).toEqual([1, 2, 3]);
  });
});
