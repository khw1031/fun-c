import { entries } from ".";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

describe("entries", () => {
  test("should entries", () => {
    expect(pipe({ a: 1, b: "2", c: true }, entries, toArray)).toEqual([
      ["a", 1],
      ["b", "2"],
      ["c", true],
    ]);
  });
});
