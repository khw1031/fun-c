import { keys } from ".";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

describe("keys", () => {
  test("should keys", () => {
    expect(pipe({ a: 1, b: "2", c: true }, keys, toArray)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });
});
