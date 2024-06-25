import { unless } from ".";
import { isNumber } from "../isNumber";
import { pipe } from "../pipe";

describe("unless", () => {
  it("predicate가 true이면 input 값을 반환한다.", () => {
    let count = 0;
    const result = pipe(
      0,
      unless(isNumber, (input) => {
        count += 1;
        return Number(input);
      }),
    );
    expect(result).toBe(0);
    expect(count).toBe(0);
  });

  it("predicate가 false이면 process 함수를 호출한다.", () => {
    let count = 0;
    const result = pipe(
      "0",
      unless(isNumber, (input) => {
        count += 1;
        return Number(input);
      }),
    );
    expect(result).toBe(0);
    expect(count).toBe(1);
  });
});
