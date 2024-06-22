import { uniqBy } from ".";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

describe("uniqBy", () => {
  test("should uniqBy", () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        uniqBy((a) => a % 2),
        toArray,
      ),
    ).toEqual([1, 2]);
    expect(
      pipe(
        [
          { age: 10, name: "a" },
          { age: 20, name: "b" },
          { age: 10, name: "c" },
          { age: 40, name: "d" },
        ],
        uniqBy((a) => a.age),
        toArray,
      ),
    ).toEqual([
      { age: 10, name: "a" },
      { age: 20, name: "b" },
      { age: 40, name: "d" },
    ]);
  });
});
