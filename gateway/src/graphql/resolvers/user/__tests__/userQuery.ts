const sum = (a: number, b: number) => a + b;

describe("query MyUserQuery()", () => {
  it("mock", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
