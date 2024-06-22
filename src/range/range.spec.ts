import { range } from ".";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

describe("range", () => {
  test("should range", () => {
    const res = pipe(range(5), toArray);
    expect(res).toEqual([0, 1, 2, 3, 4]);
  });
});
