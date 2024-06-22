import { zipWithIndex } from ".";
import { toArray } from "../toArray";

describe("zipWithIndex", () => {
  it("should zipWithIndex two iterables", () => {
    const a = [1, 2, 3];
    const zipped = zipWithIndex(a);
    expect(toArray(zipped)).toEqual([
      [0, 1],
      [1, 2],
      [2, 3],
    ]);
  });
});
