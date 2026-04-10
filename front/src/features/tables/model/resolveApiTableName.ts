/** Normaliza o nome da tabela para o endpoint da API (prefixo tb, fixes conhecidos). */
export function resolveApiTableName(tableName: string): string {
  if (!tableName) return "";

  let t = String(tableName)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();

  if (!t.startsWith("tb")) t = "tb" + t;

  const FIXES: Record<string, string> = {
    tbabioticoscoluna: "tbabioticocoluna",
    abioticoscoluna: "tbabioticocoluna",
    abiotico_coluna: "tbabioticocoluna",
    "abiotico-coluna": "tbabioticocoluna",
  };

  if (FIXES[t]) return FIXES[t];

  t = t.replace(/scoluna$/, "coluna");
  t = t.replace(/abioticoscoluna$/, "abioticocoluna");
  t = t.replace(/[^a-z0-9_]/g, "");

  return t;
}
