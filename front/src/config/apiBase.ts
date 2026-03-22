/** Base URL da API usada por fetch direto nas páginas de consulta (alinhado ao Vite). */
export const API_BASE =
  (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL ?? "http://localhost:3001";
