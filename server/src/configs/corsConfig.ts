import { CorsOptions } from "cors";
import { getEnv } from "./env";

const env = getEnv();

const baseOrigins = [
  env.CORS_ORIGIN,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
].filter(Boolean);

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (env.CORS_ORIGIN === "*") {
      callback(null, true);
      return;
    }
    if (!origin) {
      callback(null, true);
      return;
    }
    if (baseOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    if (origin.includes(".vercel.app")) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
