import type { Include } from ".";

describe("Include", () => {
  test("Include<string, string>", () => {
    expectTypeOf<Include<string, string>>().toEqualTypeOf<string>();
  });
  test("Include<string, number>", () => {
    expectTypeOf<Include<string, number>>().toEqualTypeOf<never>();
  });
});
