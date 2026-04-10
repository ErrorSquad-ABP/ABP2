import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { corsOptions } from "./configs/corsConfig";
import { getEnv } from "./configs/env";
import { openApiSpec } from "./docs/openapiSpec";
import testReservatorioRoutes from "./routes/test-reservatorio.routes";

const env = getEnv();
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(cors(corsOptions));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

app.get("/api-docs.json", (_req, res) => {
  res.json(openApiSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec as Record<string, unknown>));

if (env.NODE_ENV !== "production") {
  app.use("/api/test-reservatorio", testReservatorioRoutes);
}

app.use("/", router);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Rota não encontrada",
  });
});

app.use(errorHandler);

const PORT = env.PORT;
app.listen(PORT, () => {
  const hostHint = env.HOST_PORT ? ` (mapeado externamente como ${env.HOST_PORT})` : "";
  console.log(`Servidor rodando na porta ${PORT}${hostHint}`);
});
