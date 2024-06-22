import { slice } from ".";
import { toArray } from "../toArray";

describe("slice", () => {
  it("should slice two iterables", () => {
    const a = [1, 2, 3];
    const zipped = slice(1, 3, a);
    expect(toArray(zipped)).toEqual([2, 3]);
  });
});
