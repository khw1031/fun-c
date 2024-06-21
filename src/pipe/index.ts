import { pipe1 } from "../_internal/utils";
import { identity } from "../identity";

describe("pipe", () => {
  test("pipe", () => {
    expect(pipe1(true, identity)).toBeTruthy();
  });
});
