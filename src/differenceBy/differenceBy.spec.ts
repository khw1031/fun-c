import { differenceBy } from ".";
import { identity } from "../identity";
import { toArray } from "../toArray";

describe("differenceBy", () => {
  it("should differenceBy two iterables", () => {
    const a = [1, 2, 3];
    const b = [1, 4, 5];
    const diff = differenceBy(identity, a, b);
    expect(toArray(diff)).toEqual([4, 5]);
  });
});
