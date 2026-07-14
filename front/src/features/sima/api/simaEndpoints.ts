import { API_BASE } from "@/config/apiBase";

export type SimaTableId = "tbsima" | "tbsimaoffline";

/** Prefixo real no servidor: `/sima/sima` e `/sima/simaoffline` (não `/sima/tbsima`). */
export function simaDownloadPath(table: SimaTableId, kind: "csv" | "json" | "pdf"): string {
  const segment = table === "tbsima" ? "sima" : "simaoffline";
  return `${API_BASE}/sima/${segment}/download/${kind}`;
}

export function simaTablesPath(tabela: string, colunas?: string[]): string {
  const q = new URLSearchParams();
  q.set("all", "true");
  if (colunas?.length) {
    q.set("colunas", colunas.join(","));
  }
  return `${API_BASE}/tables/sima/${encodeURIComponent(tabela)}?${q.toString()}`;
}

export function simaRecordsListPath(page: number, limit: number): string {
  const q = new URLSearchParams({ page: String(page), limit: String(limit) });
  return `${API_BASE}/sima/sima/all?${q.toString()}`;
}
