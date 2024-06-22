import { each } from ".";
import { pipe } from "../pipe";
import { range } from "../range";

describe("each", () => {
  test("should each", () => {
    let acc = 0;
    pipe(
      range(1, 4),
      each((n) => {
        acc += n;
      }),
    );
    expect(acc).toEqual(6);
  });
});
