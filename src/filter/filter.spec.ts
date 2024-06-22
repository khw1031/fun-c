import { filter } from ".";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

describe("filter", () => {
  test("should filter iterable", () => {
    const filtered = pipe(
      [1, 2, 3],
      filter((x) => x % 2 === 0),
      toArray,
    );
    expect(filtered).toEqual([2]);
  });
});
