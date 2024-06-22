import { head } from ".";

describe("head", () => {
  test("should head", () => {
    expect(head([1, 2, 3, 4, 5])).toEqual(1);
  });
});