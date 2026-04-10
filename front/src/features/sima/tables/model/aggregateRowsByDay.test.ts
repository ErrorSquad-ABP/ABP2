import { describe, expect, it } from "vitest";
import { aggregateRowsByDay } from "./aggregateRowsByDay";

describe("aggregateRowsByDay", () => {
  it("média diária por coluna numérica", () => {
    const rows = [
      { idestacao: "1", dataHora: "2024-01-01T10:00:00Z", temp: 10 },
      { idestacao: "1", dataHora: "2024-01-01T14:00:00Z", temp: 20 },
    ];
    const out = aggregateRowsByDay(rows, ["temp"]);
    expect(out).toHaveLength(1);
    expect(out[0].day).toBe("2024-01-01");
    expect(Number(out[0].temp)).toBeCloseTo(15, 5);
  });
});
