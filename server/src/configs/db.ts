import { Pool, PoolConfig } from "pg";
import type { AppEnv } from "./env";
import { getEnv } from "./env";

function buildPoolConfig(
  env: AppEnv,
  host: string,
  port: number,
  user: string,
  password: string,
  database: string,
): PoolConfig {
  const ssl: PoolConfig["ssl"] =
    env.DB_USE_SSL === "true" ? { rejectUnauthorized: false } : undefined;

  const statementTimeoutSec = Math.max(1, Math.floor(env.DB_STATEMENT_TIMEOUT_MS / 1000));

  return {
    host,
    port,
    user,
    password,
    database,
    ssl,
    max: env.DB_POOL_MAX,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    options: `-c statement_timeout=${statementTimeoutSec}s`,
  };
}

const env = getEnv();

export const furnasPool = new Pool(
  buildPoolConfig(
    env,
    env.DB_FURNAS_HOST,
    env.DB_FURNAS_PORT,
    env.DB_FURNAS_USER,
    env.DB_FURNAS_PASSWORD,
    env.DB_FURNAS_NAME,
  ),
);

export const simaPool = new Pool(
  buildPoolConfig(
    env,
    env.DB_SIMA_HOST,
    env.DB_SIMA_PORT,
    env.DB_SIMA_USER,
    env.DB_SIMA_PASSWORD,
    env.DB_SIMA_NAME,
  ),
);

export const balcarPool = new Pool(
  buildPoolConfig(
    env,
    env.DB_BALCAR_HOST,
    env.DB_BALCAR_PORT,
    env.DB_BALCAR_USER,
    env.DB_BALCAR_PASSWORD,
    env.DB_BALCAR_NAME,
  ),
);
