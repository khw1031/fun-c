import { takeRight } from ".";
import { toArray } from "../toArray";

describe("takeRight", () => {
  it("should takeRight two iterables", () => {
    const a = [1, 2, 3];
    const zipped = takeRight(2, a);
    expect(toArray(zipped)).toEqual([2, 3]);
  });
});