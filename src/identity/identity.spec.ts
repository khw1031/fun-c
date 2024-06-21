import { identity } from ".";

describe("identity", () => {
  test("입력값을 그대로 반환해야 한다.", () => {
    expect(identity(1)).toEqual(1);
    expect(identity("a")).toEqual("a");
    expect(identity(true)).toEqual(true);
  });
  test("입력값의 타입을 유지해야 한다.", () => {
    expectTypeOf(identity(1)).toEqualTypeOf<number>();
    expectTypeOf(identity("a")).toEqualTypeOf<string>();
    expectTypeOf(identity(true)).toEqualTypeOf<boolean>();
  });
});
