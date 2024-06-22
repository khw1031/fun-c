import { cycle } from ".";
import { pipe } from "../pipe";
import { take } from "../take";
import { toArray } from "../toArray";

describe("cycle", () => {
  it("should cycle two iterables", () => {
    const a = [1, 2, 3];
    expect(pipe(cycle(a), take(4), toArray)).toEqual([1, 2, 3, 1]);
  });
});
