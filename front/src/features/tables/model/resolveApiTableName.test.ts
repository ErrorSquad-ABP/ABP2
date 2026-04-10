import { describe, expect, it } from "vitest";
import { resolveApiTableName } from "./resolveApiTableName";

describe("resolveApiTableName", () => {
  it("prefixa tb e aplica fix conhecido", () => {
    expect(resolveApiTableName("abioticoscoluna")).toBe("tbabioticocoluna");
  });

  it("normaliza nome já com tb", () => {
    expect(resolveApiTableName("tbSomething")).toBe("tbsomething");
  });
});
