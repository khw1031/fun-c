import { add } from ".";

describe("add:sync", () => {
  test("1 + 1 = 2", () => {
    console.log(add(1, 1));
    expect(add(1, 1)).toEqual(2);
  });
  test("'1' + '1' = '11'", () => {
    expect(add("1", "1")).toEqual("11");
  });
});

describe("add:async", () => {
  test("Promise(1) + Promise(1) = Promise(2)", async () => {
    expect(await add(Promise.resolve(1), 1)).toEqual(2);
  });
  test("'1' + '1' = '11'", async () => {
    expect(await add(Promise.resolve("1"), "1")).toEqual("11");
  });
});
