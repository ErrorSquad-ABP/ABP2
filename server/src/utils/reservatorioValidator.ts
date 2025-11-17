// server/src/utils/reservatorioValidator.ts

import { furnasPool } from "../configs/db";

// Mapeamento simples das tabelas e como acessam o reservatório
const TABLE_STRATEGIES: { [key: string]: string } = {
  // Tabelas com reservatório direto
  tbcampanha: "direct",
  tbsitio: "direct",
  tbreservatorio: "direct",

  // Tabelas via campanha
  tbabioticocoluna: "via_campanha",
  tbabioticosuperficie: "via_campanha",
  tbbioticocoluna: "via_campanha",
  tbbioticosuperficie: "via_campanha",
  tbfluxocarbono: "via_campanha",

  // Tabelas via sítio
  tbcamarasolo: "via_sitio",
};

export async function getReservatorioId(
  tableName: string,
  recordId: number,
): Promise<number | null> {
  try {
    const strategy = TABLE_STRATEGIES[tableName];

    if (!strategy) {
      console.log(`❌ Tabela não mapeada: ${tableName}`);
      return null;
    }

    let query = "";
    let params = [recordId];

    switch (strategy) {
      case "direct":
        query = `SELECT idreservatorio FROM ${tableName} WHERE id${tableName.replace("tb", "")} = $1`;
        break;

      case "via_campanha":
        query = `
          SELECT c.idreservatorio 
          FROM ${tableName} AS t
          JOIN tbcampanha AS c ON t.idcampanha = c.idcampanha 
          WHERE t.id${tableName.replace("tb", "")} = $1
        `;
        break;

      case "via_sitio":
        query = `
          SELECT s.idreservatorio 
          FROM ${tableName} AS t
          JOIN tbsitio AS s ON t.idsitio = s.idsitio 
          WHERE t.id${tableName.replace("tb", "")} = $1
        `;
        break;
    }

    const result = await furnasPool.query(query, params);
    return result.rows[0]?.idreservatorio || null;
  } catch (error) {
    console.error(`Erro ao buscar reservatório para ${tableName}:`, error);
    return null;
  }
}

export async function validateReservatorio(
  tableName: string,
  recordId: number,
  expectedId?: number,
): Promise<{ isValid: boolean; actualId: number | null }> {
  const actualId = await getReservatorioId(tableName, recordId);

  const isValid = expectedId !== undefined ? actualId === expectedId : actualId !== null;

  return { isValid, actualId };
}

// Função para testar várias tabelas de uma vez
export async function batchValidate(
  tests: Array<{ table: string; id: number; expected?: number }>,
): Promise<Array<{ table: string; id: number; isValid: boolean; actualId: number | null }>> {
  const results = [];

  for (const test of tests) {
    const validation = await validateReservatorio(test.table, test.id, test.expected);
    results.push({ ...test, ...validation });
  }

  return results;
}
