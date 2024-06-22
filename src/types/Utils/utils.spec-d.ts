import type {
  UniversalIterator,
  UniversalIterable,
  Iter,
  Resolve,
  Reject,
} from ".";

describe("UniversalIterator", () => {
  test("UniversalIterator<number>", () => {
    const unveralIterator = [][Symbol.iterator]() as UniversalIterator<number>;
    expectTypeOf(unveralIterator).toEqualTypeOf<
      Iterator<number> | AsyncIterator<number>
    >();
  });
});

describe("UniversalIterable", () => {
  test("UniversalIterable<number>", () => {
    const universalIterable = [][
      Symbol.iterator
    ]() as UniversalIterable<number>;
    expectTypeOf(universalIterable).toEqualTypeOf<
      Iterable<number> | AsyncIterable<number>
    >();
  });
});

describe("Iter", () => {
  test("Iter<number>", () => {
    const iter = [][Symbol.iterator]() as Iter<number>;
    expectTypeOf(iter).toEqualTypeOf<
      UniversalIterator<number> | UniversalIterable<number>
    >();
  });
});

describe("Resolve", () => {
  test("Resolve<number>", () => {
    expectTypeOf<Resolve<number>>().toEqualTypeOf<
      (a: IteratorResult<number>) => void
    >();
  });
});

describe("Reject", () => {
  test("Reject", () => {
    expectTypeOf<Reject>().toEqualTypeOf<(reason: any) => void>();
  });
});
