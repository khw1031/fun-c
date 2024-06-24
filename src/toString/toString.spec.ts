import { toString } from ".";

describe("toString", () => {
  it("number to string", () => {
    expect(toString(1)).toBe("1");
  });
  it("string to string", () => {
    expect(toString("1")).toBe("1");
  });
  it("boolean to string", () => {
    expect(toString(true)).toBe("true");
  });
  it("object to string", () => {
    expect(toString({ a: 1 })).toBe(JSON.stringify({ a: 1 }));
  });
  it("object to string: null", () => {
    expect(toString({ a: null })).toBe(JSON.stringify({ a: null }));
  });
  it("object to string: undefined", () => {
    expect(toString({ a: undefined })).toBe(JSON.stringify({ a: undefined }));
  });
  it("array to string", () => {
    expect(toString([1, 2, 3])).toBe(JSON.stringify([1, 2, 3]));
  });
  it("null to string", () => {
    expect(toString(null)).toBe("");
  });
  it("undefined to string", () => {
    expect(toString(undefined)).toBe("");
  });
});
