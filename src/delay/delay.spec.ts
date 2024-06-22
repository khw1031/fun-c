import { delay } from ".";

describe("delay", () => {
  test(
    "should delay",
    async () => {
      const res = await delay(1000, 100);
      expect(res).toEqual(100);
    },
    { timeout: 1100 },
  );
});
