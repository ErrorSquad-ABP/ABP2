export function sortBy<T>(
  items: T[],
  field: keyof T,
  order: "asc" | "desc" = "asc",
  parser?: (v: any) => any
): T[] {
  return items.slice().sort((a, b) => {
    let valA: any = a[field];
    let valB: any = b[field];

    // aplicar parser se existir
    if (parser) {
      valA = parser(valA);
      valB = parser(valB);
    }

    // tratar null/undefined → jogamos para o fim
    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;

    // normalizar strings
    if (typeof valA === "string" && typeof valB === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }
    // normalizar datas (string ISO ou Date)
    else if (
      (valA instanceof Date || typeof valA === "string") &&
      (valB instanceof Date || typeof valB === "string")
    ) {
      valA = new Date(valA as any).getTime();
      valB = new Date(valB as any).getTime();
    }

    // comparação padrão
    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });
}
