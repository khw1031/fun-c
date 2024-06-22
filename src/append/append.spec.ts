import { append } from ".";
import { toArray } from "../toArray";

describe("append", () => {
  it("should append two iterables", () => {
    const a = [1, 2, 3];
    const zipped = append(4, a);
    expect(toArray(zipped)).toEqual([1, 2, 3, 4]);
  });
});
