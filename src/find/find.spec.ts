import { find } from ".";

describe("find", () => {
  test("should find", () => {
    expect(find((a) => a === 2, [1, 2, 3, 4])).toEqual(2);
    expect(find((a) => a === "r", "helloworld")).toEqual("r");
    expect(find((a) => a === 10, [])).toEqual(undefined);
    expect(
      find(
        (a) => a.a === 1,
        [
          { a: 1, b: 2 },
          { a: 2, b: 1 },
        ],
      ),
    ).toEqual({ a: 1, b: 2 });
  });
});
