import { concat } from ".";
import { toArray } from "../toArray";

describe("concat", () => {
  it("should concat two iterables", () => {
    const a = [1, 2, 3];
    const zipped = concat(a, [4, 5, 6]);
    expect(toArray(zipped)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
