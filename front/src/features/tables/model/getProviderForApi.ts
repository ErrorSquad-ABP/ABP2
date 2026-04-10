/* eslint-disable @typescript-eslint/no-explicit-any -- itens de metadata da API */
/** Infere furnas | balcar | sima a partir dos metadados ou do nome da API. */
export function getProviderForApi(
  apiName: string | undefined,
  metadata: any[] | null,
  responsibleFromMetadata: Record<string, any> | null,
): string | null {
  if (!apiName) return null;
  const key = String(apiName);

  try {
    if (responsibleFromMetadata && typeof responsibleFromMetadata === "object") {
      const resp = responsibleFromMetadata[key] ?? responsibleFromMetadata[key.toLowerCase()];
      if (resp) {
        const r = String(resp).toLowerCase();
        if (r.includes("furnas")) return "furnas";
        if (r.includes("balcar")) return "balcar";
        if (r.includes("sima")) return "sima";
      }
    }
  } catch {
    /* empty */
  }

  try {
    if (metadata && Array.isArray(metadata)) {
      const found =
        metadata.find((m: any) => {
          if (!m) return false;
          const candidates = [m.name, m.id, m.tableName, (m as any).apiName, m.title, m.label]
            .filter(Boolean)
            .map((c: any) => String(c).toLowerCase());
          return candidates.includes(key.toLowerCase());
        }) ||
        metadata.find((m: any) => {
          if (!m) return false;
          const resp = String(m.responsible ?? m.source ?? "").toLowerCase();
          return (
            resp &&
            resp.includes("furnas") &&
            (m.name === key || String(m.name).toLowerCase().includes(String(key).toLowerCase()))
          );
        });

      if (found) {
        const r = String(found.responsible ?? found.source ?? "").toLowerCase();
        if (r.includes("furnas")) return "furnas";
        if (r.includes("balcar")) return "balcar";
        if (r.includes("sima")) return "sima";
      }
    }
  } catch {
    /* empty */
  }

  try {
    const n = key.toLowerCase();
    if (n.startsWith("tb") && n.includes("sima")) return "sima";
    if (n.startsWith("tb") && n.includes("balcar")) return "balcar";
    if (n.startsWith("tb")) return "furnas";
  } catch {
    /* empty */
  }

  return null;
}
