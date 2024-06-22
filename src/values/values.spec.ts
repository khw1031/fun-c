import { values } from ".";
import { toArray } from "../toArray";

describe("values", () => {
  test("should values", () => {
    expect(toArray(values({ a: 1, b: 2, c: 3 }))).toEqual([1, 2, 3]);
  });
});
