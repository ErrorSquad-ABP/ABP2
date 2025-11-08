import { CorsOptions } from "cors";

// Origens permitidas: localhost para desenvolvimento e URLs de produção via variável de ambiente
const allowedOrigins = [
  "http://localhost:3002",
  "http://localhost:5173",
  process.env.CORS_ORIGIN,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
].filter((origin): origin is string => Boolean(origin));

export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Permite requisições sem origin (ex: Postman, mobile apps)
    if (!origin) {
      callback(null, true);
      return;
    }

    // Verifica se a origin está na lista de permitidas
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    // Permite também domínios da Vercel (*.vercel.app)
    if (origin.endsWith(".vercel.app")) {
      callback(null, true);
      return;
    }

    // Se chegou aqui, não está permitido
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};
