import { pipe } from ".";

describe("pipe", () => {
  test("순차적으로 함수를 실행해야 한다.", () => {
    expect(
      pipe(
        10,
        (n) => n + "10",
        (n) => +n + 100,
      ),
    ).toBe(1110);
  });
});
