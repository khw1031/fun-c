import { isEmpty } from ".";

describe("isEmpty", () => {
  test("should isEmpty", () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(2)).toBe(false);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty(function () {})).toBe(false);
    expect(isEmpty(Symbol(""))).toBe(false);
    expect(isEmpty(new Date())).toBe(false);
  });
});
