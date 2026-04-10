/** Base URL da API (Vite: `VITE_API_URL` ou host atual + `VITE_SERVER_PORT`). */
function resolveApiBase(): string {
  const env = import.meta.env as { VITE_API_URL?: string; VITE_SERVER_PORT?: string };
  if (env.VITE_API_URL?.trim()) {
    return env.VITE_API_URL.replace(/\/$/, "");
  }
  const port = env.VITE_SERVER_PORT || "3001";
  if (typeof window !== "undefined" && window.location?.hostname) {
    return `${window.location.protocol}//${window.location.hostname}:${port}`;
  }
  return `http://localhost:${port}`;
}

export const API_BASE = resolveApiBase();
