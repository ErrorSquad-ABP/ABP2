/**
 * Normaliza datas de strings em formatos comuns para "YYYY-MM-DD".
 *
 * Formatos aceitos:
 * - DD/MM/YYYY ou D/M/YYYY
 * - YYYY-MM-DD
 * - YYYY-MM-DD HH:mm (ignora hora)
 * - MM-DD-YYYY
 *
 * Retorna: string no formato ISO "YYYY-MM-DD" ou null se inválido.
 */
export function normalizeDate(value: string): string | null {
  if (!value) return null;

  const trimmed = value.trim();

  // DD/MM/YYYY ou D/M/YYYY
  const matchDMY = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
  if (matchDMY) {
    const [, d, m, y] = matchDMY;
    return buildISODate(Number(y), Number(m), Number(d));
  }

  // YYYY-MM-DD ou YYYY-MM-DD HH:mm
  const matchYMD = /^(\d{4})-(\d{2})-(\d{2})(?:\s+\d{2}:\d{2})?$/.exec(trimmed);
  if (matchYMD) {
    const [, y, m, d] = matchYMD;
    return buildISODate(Number(y), Number(m), Number(d));
  }

  // MM-DD-YYYY
  const matchMDY = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(trimmed);
  if (matchMDY) {
    const [, m, d, y] = matchMDY;
    return buildISODate(Number(y), Number(m), Number(d));
  }

  return null;
}

/**
 * Constrói string ISO segura a partir de ano/mês/dia.
 * Retorna null se data inválida (ex: 31/02/2023).
 */
function buildISODate(y: number, m: number, d: number): string | null {
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  ) {
    return date.toISOString().slice(0, 10);
  }
  return null;
}

/**
 * Normaliza números em diferentes notações locais.
 *
 * Aceita:
 * - "5,0"
 * - "1.234,56"
 * - "1234.56"
 * - number
 *
 * Retorna: number ou null se inválido.
 */
export function parseLocaleNumber(value: string | number): number | null {
  if (value == null) return null;

  if (typeof value === "number") {
    return isNaN(value) ? null : value;
  }

  const trimmed = value.trim();
  if (!trimmed) return null;

  // detectar padrão com vírgula decimal (pt-BR)
  if (/[,]/.test(trimmed)) {
    // remover separadores de milhar "."
    const normalized = trimmed.replace(/\./g, "").replace(",", ".");
    const num = Number(normalized);
    return isNaN(num) ? null : num;
  }

  // fallback: parse direto (ex: "1234.56")
  const num = Number(trimmed);
  return isNaN(num) ? null : num;
}
