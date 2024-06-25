import { toNumber } from ".";

describe("toNumber", () => {
  it("number 1", () => {
    expect(toNumber(1)).toBe(1);
  });
  it("number 1000000", () => {
    expect(toNumber(1000000)).toBe(1000000);
  });
  it("string 1", () => {
    expect(toNumber("1")).toBe(1);
  });
  it("string 1.1", () => {
    expect(toNumber("1.1")).toBe(1.1);
  });
  it("string 1.1.1", () => {
    expect(toNumber("1.1.1")).toBe(NaN);
  });
  it("string 1,000,000", () => {
    expect(toNumber("1,000,000")).toBe(1000000);
  });
  it("string 1,0,0,0,0,0,0", () => {
    expect(toNumber("1,0,0,0,0,0,0")).toBe(NaN);
  });
  it("string 1000,000", () => {
    expect(toNumber("1000,000")).toBe(NaN);
  });
  it("string -1,000,000", () => {
    expect(toNumber("-1,000,000")).toBe(-1000000);
  });
});