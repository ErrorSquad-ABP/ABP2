/** Documento OpenAPI 3.0 servido em `/api-docs` (UI) e `/api-docs.json`. */
export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "ABP2 API",
    version: "1.0.0",
    description: "API do sistema de dados limnológicos (SIMA, Furnas, BALCAR).",
  },
  servers: [{ url: "/", description: "Servidor atual" }],
  paths: {
    "/health": {
      get: {
        summary: "Saúde da API e dos três bancos PostgreSQL",
        tags: ["Sistema"],
        responses: {
          "200": {
            description: "Todos os pools responderam",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HealthOk" },
              },
            },
          },
          "503": {
            description: "Um ou mais bancos indisponíveis",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HealthDegraded" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      HealthOk: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          status: { type: "string", example: "ok" },
          uptimeSec: { type: "integer" },
          memory: { type: "object" },
          dependencies: { type: "object" },
        },
      },
      HealthDegraded: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          status: { type: "string", example: "degraded" },
          uptimeSec: { type: "integer" },
          dependencies: { type: "object" },
        },
      },
    },
  },
} as const;
