import { z } from "zod";

/** Tabelas SIMA expostas pelo endpoint `/tables/sima/:tabela`. */
export const SIMA_TABLE_ALLOWLIST = new Set([
  "tbestacao",
  "tbsima",
  "tbsimaoffline",
  "tbsensor",
  "tbcampotabela",
]);

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve ser YYYY-MM-DD")
  .optional();

export const simaExportQuerySchema = z
  .object({
    startDate: isoDate,
    endDate: isoDate,
    stations: z.string().max(2000).optional(),
    sortBy: z.string().max(200).optional(),
    sortOrder: z.enum(["asc", "desc", "ASC", "DESC"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endDate não pode ser anterior a startDate",
        path: ["endDate"],
      });
    }
  });

export type SimaExportQuery = z.infer<typeof simaExportQuerySchema>;

export function parseSimaExportQuery(query: Record<string, unknown>):
  | {
      ok: true;
      data: SimaExportQuery;
    }
  | {
      ok: false;
      error: string;
    } {
  const parsed = simaExportQuerySchema.safeParse(query);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join("; ");
    return { ok: false, error: msg };
  }
  return { ok: true, data: parsed.data };
}

const identifier = z.string().regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/);

export function parseSimaColumnList(
  raw: unknown,
): { ok: true; columns: string } | { ok: false; error: string } {
  if (raw === undefined || raw === null || raw === "") {
    return { ok: true, columns: "*" };
  }
  const s = String(raw);
  if (s.length > 4000) {
    return { ok: false, error: "Lista de colunas excede o tamanho máximo" };
  }
  const parts = s
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length > 200) {
    return { ok: false, error: "Número máximo de colunas excedido" };
  }
  for (const p of parts) {
    const r = identifier.safeParse(p);
    if (!r.success) {
      return { ok: false, error: `Nome de coluna inválido: ${p}` };
    }
  }
  /* Sem aspas: o PostgreSQL normaliza identificadores não citados para minúsculas (compatível com o front). */
  return { ok: true, columns: parts.join(",") };
}

export function assertSimaTableAllowed(
  tabela: string,
): { ok: true } | { ok: false; error: string } {
  const normalized = String(tabela || "")
    .trim()
    .toLowerCase();
  if (!normalized) {
    return { ok: false, error: "Nome da tabela é obrigatório" };
  }
  if (!SIMA_TABLE_ALLOWLIST.has(normalized)) {
    return { ok: false, error: "Tabela não permitida para consulta pública" };
  }
  return { ok: true };
}
