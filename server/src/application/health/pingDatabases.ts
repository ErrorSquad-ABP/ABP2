import type { Pool } from "pg";

export type DbDependencyId = "furnasDb" | "simaDb" | "balcarDb";

export interface DbPingResult {
  id: DbDependencyId;
  ok: boolean;
  latencyMs?: number;
  error?: string;
}

export interface HealthPingSummary {
  ok: boolean;
  dependencies: Record<DbDependencyId, DbPingResult>;
}

/**
 * Executa `SELECT 1` em cada pool. Falha parcial mantém `ok: false` no agregado.
 */
export async function pingDatabases(pools: {
  furnas: Pool;
  sima: Pool;
  balcar: Pool;
}): Promise<HealthPingSummary> {
  const jobs: Array<{ id: DbDependencyId; pool: Pool }> = [
    { id: "furnasDb", pool: pools.furnas },
    { id: "simaDb", pool: pools.sima },
    { id: "balcarDb", pool: pools.balcar },
  ];

  const results = await Promise.all(
    jobs.map(async ({ id, pool }) => {
      const started = Date.now();
      try {
        await pool.query("SELECT 1 AS ok");
        return {
          id,
          ok: true,
          latencyMs: Date.now() - started,
        } satisfies DbPingResult;
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return {
          id,
          ok: false,
          latencyMs: Date.now() - started,
          error: message,
        } satisfies DbPingResult;
      }
    }),
  );

  const dependencies = results.reduce(
    (acc, r) => {
      acc[r.id] = r;
      return acc;
    },
    {} as Record<DbDependencyId, DbPingResult>,
  );

  const ok = results.every((r) => r.ok);
  return { ok, dependencies };
}
