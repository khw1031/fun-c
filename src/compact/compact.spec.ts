import { compact } from ".";
import { toArray } from "../toArray";

describe("compact", () => {
  it("should compact two iterables", () => {
    const a = [1, 2, 3, null, undefined, 0, false, ""];
    const zipped = compact(a);
    expect(toArray(zipped)).toEqual([1, 2, 3, 0, false, ""]);
  });
});
