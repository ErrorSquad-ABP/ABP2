import { describe, expect, it } from "vitest";
import { isDateColumn, isIdColumn } from "./columnGuards";

describe("columnGuards", () => {
  it("detects id columns", () => {
    expect(isIdColumn("idestacao")).toBe(true);
    expect(isIdColumn("idsima")).toBe(true);
    expect(isIdColumn("tempar")).toBe(false);
  });

  it("detects date columns", () => {
    expect(isDateColumn("datahora")).toBe(true);
    expect(isDateColumn("datamedida")).toBe(true);
    expect(isDateColumn("tempar")).toBe(false);
  });
});
