import { split } from ".";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

describe("split", () => {
  test("should split", () => {
    const res = pipe("1,2,3,4,5", split(","), toArray);
    expect(res).toEqual(["1", "2", "3", "4", "5"]);
  });
});
