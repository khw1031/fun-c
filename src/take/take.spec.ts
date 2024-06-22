import { take } from ".";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

describe("take", () => {
  test("should take iterable", () => {
    const iterable = [1, 2, 3];
    const taken = pipe(iterable, take(2), toArray);
    expect(taken).toEqual([1, 2]);
  });
});
