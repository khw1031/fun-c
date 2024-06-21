import { noop } from ".";

describe("noop", () => {
  test("undefined를 반환해야 한다.", () => {
    expect(noop()).toBeUndefined();
  });
  test("void 타입을 반환해야 한다.", () => {
    expectTypeOf(noop()).toEqualTypeOf<void>();
  });
});
