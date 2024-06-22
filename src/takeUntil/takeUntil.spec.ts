import { takeUntil } from ".";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

describe("takeUntil", () => {
  test("should takeUntil", () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        takeUntil((a) => a === 3),
        toArray,
      ),
    ).toEqual([1, 2, 3]);
  });
});
