import { compress } from ".";
import { toArray } from "../toArray";

describe("compress", () => {
  it("should compress two iterables", () => {
    const a = [1, 2, 3];
    const zipped = compress([true, false, true], a);
    expect(toArray(zipped)).toEqual([1, 3]);
  });
});
