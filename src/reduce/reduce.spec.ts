import { reduce } from ".";

const addNumber = (a: number, b: number) => a + b;
const addNumberAsync = async (a: number, b: number) => a + b;

describe("reduce:sync", () => {
  it("이터러블이 비어있으면, 초기값을 반환해야 한다.", () => {
    expect(reduce(addNumber, "seed", [])).toBe("seed");
  });

  it("이터러블이 비어있고, 초기값도 없으면 에러를 반환해야 한다.", () => {
    expect(() => reduce(addNumber, [])).toThrowError();
  });

  it("배열의 모든 요소를 합산해야 한다.", () => {
    const result = reduce(addNumber, 0, [1, 2, 3, 4]);
    expect(result).toBe(10);
  });

  it("배열의 모든 요소의 합산과 초기값을 합산해야 한다.", () => {
    const result = reduce(addNumber, 5, [1, 2, 3, 4]);
    expect(result).toBe(15);
  });
});

describe("reduce:async", () => {
  it("프로미스 배열의 모든 요소를 합산해야 한다.", async () => {
    const asyncIterator = (async function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
    })();

    const result = await reduce(addNumberAsync, 0, asyncIterator);
    expect(result).toBe(10);
  });
});
