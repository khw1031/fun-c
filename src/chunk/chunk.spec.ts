import { chunk } from ".";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

describe("chunk", () => {
  test("should chunk", async () => {
    const res = pipe([1, 2, 3, 4], chunk(2), toArray);
    expect(res).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
