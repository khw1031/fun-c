import { reject } from ".";
import { pipe } from "../pipe";
import { range } from "../range";
import { toArray } from "../toArray";

describe("reject", () => {
  test("should reject", () => {
    const res = pipe(
      range(5),
      reject((n) => n % 2 === 0),
      toArray,
    );
    expect(res).toEqual([1, 3]);
  });
});
