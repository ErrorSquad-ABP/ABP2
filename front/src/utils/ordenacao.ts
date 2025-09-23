// Função genérica de ordenação estável
export function sortBy<T>(
  items: T[],
  field: keyof T,
  order: "asc" | "desc" = "asc",
  parser?: (v: any) => any
): T[] {
  // cópia para manter imutabilidade
  return items
    .slice()
    .sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      // aplicar parser se existir
      if (parser) {
        valA = parser(valA);
        valB = parser(valB);
      }

      // tratar null/undefined → jogamos para o fim
      if (valA == null && valB == null) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      // normalizar tipos
      if (typeof valA === "string" && typeof valB === "string") {
        // strings → case-insensitive
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      } else if (
        (valA instanceof Date || typeof valA === "string") &&
        (valB instanceof Date || typeof valB === "string")
      ) {
        // datas (ISO string ou Date)
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }

      // comparação padrão
      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });
}
