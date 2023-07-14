import { Get, Post, Patch, Delete, Put } from "../src/decorators";

describe("decorators", () => {
  test.each([
    [Get, "get"],
    [Post, "post"],
    [Patch, "patch"],
    [Put, "put"],
    [Delete, "delete"],
  ])("should %p add route /test for method: %p", (decor, method) => {
    const decorated = decor("/test");
    const instance: any = {};
    decorated(instance, "propertyKey", {});
    expect(instance.__routes__[0].method).toBe(method);
  });
  it("should return a function", () => {
    expect(Get()).toBeInstanceOf(Function);
  });
});
