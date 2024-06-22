import { zip } from ".";
import { toArray } from "../toArray";

describe("zip", () => {
  it("should zip two iterables", () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    const zipped = zip(a, b);
    expect(toArray(zipped)).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });
});
