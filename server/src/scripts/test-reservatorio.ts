// server/src/scripts/test-reservatorio.ts
import { batchValidate } from "../utils/reservatorioValidator";

async function quickTest() {
  console.log("🧪 Teste Rápido - Validação Reservatório\n");

  const tests = [
    { table: "tbabioticocoluna", id: 1, expected: 1 },
    { table: "tbcampanha", id: 1, expected: 1 },
    { table: "tbsitio", id: 1, expected: 1 },
    { table: "tbreservatorio", id: 1, expected: 1 },
  ];

  const results = await batchValidate(tests);

  results.forEach((result, index) => {
    const test = tests[index];
    const status = result.isValid ? "✅" : "❌";
    console.log(`${status} ${result.table} (ID: ${result.id})`);
    console.log(`   Esperado: ${test.expected || "N/A"} | Encontrado: ${result.actualId}`);
    console.log(`   Válido: ${result.isValid}\n`);
  });
}

// Rodar se chamado diretamente
if (require.main === module) {
  quickTest()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Erro no teste:", error);
      process.exit(1);
    });
}

export { quickTest };
