import { map } from ".";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

describe("map", () => {
  it("should map iterable", () => {
    const iterable = [1, 2, 3];
    const mapped = pipe(
      map((x) => x * 2, iterable),
      toArray,
    );
    expect(mapped).toEqual([2, 4, 6]);
  });
});
