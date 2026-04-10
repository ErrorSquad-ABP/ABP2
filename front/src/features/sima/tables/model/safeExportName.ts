import type { SimaTableId } from "../../api/simaEndpoints";

/** Nome de arquivo seguro para exportações (evita path / caracteres especiais). */
export function safeSimaExportBasename(table: string): SimaTableId | "sima_export" {
  if (table === "tbsima" || table === "tbsimaoffline") return table;
  return "sima_export";
}
