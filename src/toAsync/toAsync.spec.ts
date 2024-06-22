import { toAsync } from ".";
import { pipe } from "../pipe";

describe("toAsync", () => {
  test("should toAsync iterable", async () => {
    const asyncIter = pipe([1, 2, 3, 4, 5], toAsync);
    let acc = 0;
    for await (const item of asyncIter) {
      acc += item;
    }
    expect(acc).toEqual(15);
  });
});
