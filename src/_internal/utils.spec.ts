import { add } from "../add";
import { isPromise, pipe1 } from "./utils";

describe("isPromise", () => {
  test("1 is not a promise", () => {
    expect(isPromise(1)).toBeFalsy();
  });
  test("Promise(1) is a promise", () => {
    expect(isPromise(Promise.resolve(1))).toBeTruthy();
  });
});

describe("pipe1", () => {
  test("pipe(1, add(1))", () => {
    expect(pipe1(1, add(1))).toEqual(2);
  });
  test("pipe(Promise(1), add(1))", async () => {
    expect(await pipe1(Promise.resolve(1), add(1))).toEqual(2);
  });
});
