import { toArray } from ".";

describe("toArray", () => {
  test("should convert iterable to array", () => {
    const iterable = (function* () {
      yield 1;
      yield 2;
      yield 3;
    })();
    const array = toArray(iterable);
    expect(array).toEqual([1, 2, 3]);
  });
});
