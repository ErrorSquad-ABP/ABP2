/* eslint-disable @typescript-eslint/no-explicit-any */

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Lê campo do objeto testando nomes candidatos (case-insensitive nas chaves). */
export function getField(obj: any, candidates: string[] = []): any {
  if (!obj || typeof obj !== "object") return undefined;
  for (const c of candidates) {
    if (c in obj && obj[c] != null) return obj[c];
    const lower = c.toLowerCase();
    for (const k of Object.keys(obj)) {
      if (k.toLowerCase() === lower) return obj[k];
    }
  }
  return undefined;
}

export function lightenHex(hex: string, amount = 0.04): string {
  try {
    if (!hex || typeof hex !== "string") return String(hex);
    let h = hex.replace("#", "").trim();
    if (h.length === 3) {
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    }
    if (h.length !== 6) return hex;
    const num = parseInt(h, 16);
    const r = Math.min(255, Math.floor(((num >> 16) & 0xff) * (1 + amount)));
    const g = Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 + amount)));
    const b = Math.min(255, Math.floor(((num >> 0) & 0xff) * (1 + amount)));
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return hex;
  }
}

export function isIdOrDateColumn(name?: string): boolean {
  if (!name) return false;
  const n = String(name).toLowerCase();
  if (/^id/.test(n) || /id$/.test(n)) return true;
  if (
    /\b(id|idestacao|idsima|regno|nro|numero|num|uid|registro|idreservatorio|idcampanha)\b/.test(n)
  )
    return true;
  if (
    /\bdatahora\b/.test(n) ||
    /\bdatamedida\b/.test(n) ||
    /\bdatainicio\b/.test(n) ||
    /\bdata\b/.test(n)
  )
    return true;
  return false;
}
