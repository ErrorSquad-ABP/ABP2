import { CorsOptions } from "cors";

// CORS totalmente permissivo - permite todas as origens
export const corsOptions: CorsOptions = {
  origin: true, // Permite todas as origens
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
  allowedHeaders: "*", // Permite todos os headers
  exposedHeaders: "*", // Expõe todos os headers
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
