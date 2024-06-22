import { difference } from ".";
import { toArray } from "../toArray";

describe("difference", () => {
  it("should difference two iterables", () => {
    const a = [1, 2, 3];
    const b = [2, 3, 4];
    const diff = difference(a, b);
    expect(toArray(diff)).toEqual([4]);
  });
});
