import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  HOST_PORT: z.coerce.number().int().optional(),
  PAGE_SIZE: z.coerce.number().int().min(1).max(500).default(20),
  LOG_LEVEL: z.string().default("info"),
  CORS_ORIGIN: z.string().default("http://localhost:3002"),
  DB_USE_SSL: z.enum(["true", "false"]).optional(),

  DB_POOL_MAX: z.coerce.number().int().min(1).max(100).default(10),
  DB_STATEMENT_TIMEOUT_MS: z.coerce.number().int().min(1000).max(300_000).default(30_000),

  DB_FURNAS_HOST: z.string().min(1),
  DB_FURNAS_PORT: z.coerce.number().int().positive(),
  DB_FURNAS_USER: z.string().min(1),
  DB_FURNAS_PASSWORD: z.string(),
  DB_FURNAS_NAME: z.string().min(1),

  DB_SIMA_HOST: z.string().min(1),
  DB_SIMA_PORT: z.coerce.number().int().positive(),
  DB_SIMA_USER: z.string().min(1),
  DB_SIMA_PASSWORD: z.string(),
  DB_SIMA_NAME: z.string().min(1),

  DB_BALCAR_HOST: z.string().min(1),
  DB_BALCAR_PORT: z.coerce.number().int().positive(),
  DB_BALCAR_USER: z.string().min(1),
  DB_BALCAR_PASSWORD: z.string(),
  DB_BALCAR_NAME: z.string().min(1),
});

export type AppEnv = z.infer<typeof envSchema>;

let cached: AppEnv | null = null;

/** Valida e faz cache de `process.env`. Chamar após `dotenv.config()`. */
export function getEnv(): AppEnv {
  if (!cached) {
    const parsed = envSchema.safeParse(process.env);
    if (!parsed.success) {
      const msg = parsed.error.flatten().fieldErrors;
      throw new Error(`Variáveis de ambiente inválidas: ${JSON.stringify(msg)}`);
    }
    cached = parsed.data;
  }
  return cached;
}

export function resetEnvCacheForTests(): void {
  cached = null;
}
