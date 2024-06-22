import { tap } from ".";
import { pipe } from "../pipe";

describe("tap", () => {
  test("should tap", () => {
    expect(pipe([1, 2, 3, 4, 5], tap(console.log))).toEqual([1, 2, 3, 4, 5]);
  });
});
