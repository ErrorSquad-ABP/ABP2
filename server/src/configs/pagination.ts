import { getEnv } from "./env";

/** Tamanho de página padrão a partir de `PAGE_SIZE` (validado em `env.ts`). */
export function getDefaultPageSize(): number {
  return getEnv().PAGE_SIZE;
}
