import { fromEntries } from ".";

describe("fromEntries", () => {
  test("should fromEntries", () => {
    expect(
      fromEntries([
        ["a", 1],
        ["b", true],
        ["c", "hello"],
        ["d", undefined],
        ["e", null],
      ]),
    ).toEqual({
      a: 1,
      b: true,
      c: "hello",
      e: null,
    });
  });
});
