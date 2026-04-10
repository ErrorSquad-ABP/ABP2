import { describe, expect, it } from "vitest";
import { filterSimaRowsByStationsAndDateRange } from "./simaRowFilter";

describe("filterSimaRowsByStationsAndDateRange", () => {
  it("filtra por estação e intervalo de dias", () => {
    const rows = [
      { idestacao: "A", dataHora: "2024-06-01T12:00:00Z", v: 1 },
      { idestacao: "B", dataHora: "2024-06-01T12:00:00Z", v: 2 },
      { idestacao: "A", dataHora: "2024-07-01T12:00:00Z", v: 3 },
    ];
    const set = new Set(["A"]);
    const out = filterSimaRowsByStationsAndDateRange(rows, set, "2024-06-01", "2024-06-30");
    expect(out).toHaveLength(1);
    expect(out[0].v).toBe(1);
  });
});
