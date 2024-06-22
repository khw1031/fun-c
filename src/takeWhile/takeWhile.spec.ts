import { takeWhile } from ".";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

describe("takeWhile", () => {
  test("should takeWhile", () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        takeWhile((a) => a < 3),
        toArray,
      ),
    ).toEqual([1, 2]);
  });
});
