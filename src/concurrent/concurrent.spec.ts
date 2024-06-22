import { concurrent } from ".";
import { delay } from "../delay";
import { toAsync } from "../toAsync";

describe("concurrent", () => {
  test(
    "should concurrent iterable",
    async () => {
      const res = concurrent(
        2,
        toAsync(
          (function* () {
            yield delay(1000, 1);
            yield delay(1000, 2);
            yield delay(1000, 3);
            yield delay(1000, 4);
          })(),
        ),
      );
      const acc = [];
      for await (const item of res) {
        acc.push(item);
      }
      expect(acc).toEqual([1, 2, 3, 4]);
    },
    { timeout: 2050 },
  );
});
