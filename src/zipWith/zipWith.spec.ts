import { zipWith } from ".";
import { toArray } from "../toArray";

describe("zipWith", () => {
  it("should zipWith two iterables", () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    const zipped = zipWith((a, b) => [b, a], a, b);
    expect(toArray(zipped)).toEqual([
      [4, 1],
      [5, 2],
      [6, 3],
    ]);
  });
});
