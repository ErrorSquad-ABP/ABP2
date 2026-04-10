/** Mensagem amigável quando exportação SIMA (CSV/JSON/PDF) falha no servidor. */
export async function messageForFailedSimaExport(response: Response): Promise<string> {
  try {
    const text = await response.clone().text();
    if (text) {
      try {
        const j = JSON.parse(text) as { error?: unknown; message?: unknown };
        if (typeof j.error === "string" && j.error.trim()) return j.error;
        if (typeof j.message === "string" && j.message.trim()) return j.message;
      } catch {
        const t = text.trim().slice(0, 240);
        if (t) return t;
      }
    }
  } catch {
    /* ignore */
  }
  return `Exportação indisponível (HTTP ${response.status}). Ajuste filtros ou tente mais tarde.`;
}
