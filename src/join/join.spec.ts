import { join } from ".";
import { pipe } from "../pipe";

describe("join", () => {
  test("should join", () => {
    const res = pipe(["a", "b", "c"], join("-"));
    expect(res).toEqual("a-b-c");
  });
});
