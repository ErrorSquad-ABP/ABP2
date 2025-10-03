import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

// limite máximo de registros por página
const MAX_LIMIT = 500;

const TABLE_WHITELIST: Record<string, string[]> = {
  tbabioticocoluna: [
    "idAbioticoColuna",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "horaMedida",
    "profundidade",
    "dic",
    "nt",
    "pt",
    "delta13c",
    "delta15n",
  ],
  tbabioticosuperficie: [
    "idAbioticoSuperficie",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "horaMedida",
    "dic",
    "nt",
    "pt",
    "delta13c",
    "delta15n",
  ],
  tbaguamateriaorganicasedimento: [
    "idAguaMateriaOrganicaSedimento",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "horaMedida",
    "profundidade",
    "batimetria",
    "agua",
    "materiaOrganica",
  ],
  tbbioticocoluna: [
    "idBioticoColuna",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "horaMedida",
    "profundidade",
    "doc",
    "toc",
    "poc",
    "densidadeBacteria",
    "biomassaBacteria",
    "clorofilaA",
    "biomassaCarbonoTotalFito",
    "densidadeTotalFito",
    "biomassaZoo",
    "densidadeTotalZoo",
  ],
  tbbioticosuperficie: [
    "idBioticoSuperficie",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "horaMedida",
    "doc",
    "toc",
    "poc",
    "densidadeBacteria",
    "biomassaBacteria",
    "clorofilaA",
    "biomassaCarbonoTotalFito",
    "densidadeTotalFito",
    "biomassaZoo",
    "densidadeTotalZoo",
  ],
  tbbolhas: [
    "idBolhas",
    "idCampanha",
    "idSitio",
    "profundidade",
    "nroDeFunis",
    "volumeColetado",
    "CO2",
    "O2",
    "N2",
    "CH4",
    "N2O",
    "dataMedida",
    "horaMedida",
  ],
  tbcamarasolo: [
    "idCamaraSolo",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "horaMedida",
    "CH4",
    "CO2",
    "N2O",
    "tempAr",
    "tempSolo",
    "vento",
    "altitude",
  ],
  tbcampanha: [
    "idcampanha",
    "idreservatorio",
    "idinstituicao",
    "nrocampanha",
    "datainicio",
    "datafim",
  ],
  tbcampanhaportabela: ["idCampanha", "idTabela"],
  tbcarbono: [
    "idCarbono",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "horaMedida",
    "DC",
    "DOC",
    "POC",
    "TOC",
    "DIC",
    "TC",
  ],
  tbconcentracaogasagua: [
    "idConcentracaoGasAgua",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "horaMedida",
    "batimetria",
    "altura",
    "replica",
    "CH4",
    "CO2",
  ],
  tbconcentracaogassedimento: [
    "idConcentracaoGasSedimento",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "horaMedida",
    "batimetria",
    "profundidadeDoSedimento",
    "replica",
    "CH4",
    "CO2",
  ],
  tbdadosprecipitacao: [
    "idDadosPrecipitacao",
    "idReservatorio",
    "dataMedida",
    "precipitacao",
    "idReservatorio_anterior",
  ],
  tbdadosrepresa: [
    "idDadosRepresa",
    "idReservatorio",
    "dataMedida",
    "nivelReservatorio",
    "volUtilReservatorio",
    "porVolUtilReservatorio",
    "geracao",
    "vazaoAfluente",
    "vazaoDefluente",
    "produtividade",
    "vazaoTurbinada",
    "vazaoVertida",
    "vazaoTurbinadaVazio",
    "idReservatorio_anterior",
  ],
  tbdifusao: [
    "idDifusao",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "horaMedida",
    "CH4",
    "CO2",
    "N2O",
    "pH",
    "tempAgua",
    "tempAr",
    "profundidade",
    "altitude",
    "vento",
  ],
  tbdupladessorcaoagua: [
    "idDuplaDessorcaoAgua",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "horaMedida",
    "profundidade",
    "CO2",
    "O2",
    "N2",
    "CH4",
    "N2O",
  ],
  tbfluxobolhasinpe: [
    "idFluxoBolhasInpe",
    "idCampanha",
    "idSitio",
    "profundidade",
    "CH4",
    "CH4_desvioPadrao",
    "CH4_amostras",
    "dataMedida",
    "horaMedida",
  ],
  tbfluxocarbono: [
    "idFluxoCarbono",
    "idCampanha",
    "idSitio",
    "producaoFitoplanctonica",
    "carbonoOrganicoExcretado",
    "respiracaoFito",
    "producaoBacteriana",
    "respiracaoBacteriana",
    "taxaSedimentacao",
    "dataMedida",
    "horaMedida",
  ],
  tbfluxodifusivo: [
    "idFluxoDifusivo",
    "idCampanha",
    "idSitio",
    "batimetria",
    "intervalo",
    "CH4",
    "CO2",
    "dataMedida",
    "horaMedida",
  ],
  tbfluxodifusivoinpe: [
    "idFluxoDifusivoInpe",
    "idCampanha",
    "idSitio",
    "profundidade",
    "CO2",
    "CO2_desvioPadrao",
    "CO2_amostras",
    "CH4",
    "CH4_desvioPadrao",
    "CH4_amostras",
    "dataMedida",
    "horaMedida",
  ],
  tbgasesembolhas: [
    "idGasesEmBolhas",
    "idCampanha",
    "idSitio",
    "profundidade",
    "CO2",
    "O2",
    "N2",
    "CH4",
    "N2O",
    "dataMedida",
  ],
  tbhoriba: [
    "idHoriba",
    "idCampanha",
    "idSitio",
    "profundidade",
    "tempAgua",
    "condutividade",
    "pH",
    "DO",
    "TDS",
    "redox",
    "turbidez",
    "dataMedida",
  ],
  tbinstituicao: ["idInstituicao", "nome"],
  tbionsnaaguaintersticialdosedimento: [
    "idIonsNaAguaIntersticialDoSedimento",
    "idCampanha",
    "idSitio",
    "profundidade",
    "batimetria",
    "F",
    "Cl",
    "NO2",
    "Br",
    "NO3",
    "PO4",
    "SO4",
    "Na",
    "NH4",
    "K",
    "Mg",
    "Ca",
    "acetato",
    "dataMedida",
    "horaMedida",
  ],
  tbmedidacampocoluna: [
    "idMedidaCampoColuna",
    "idCampanha",
    "idSitio",
    "profundidade",
    "secchi",
    "tempAgua",
    "condutividade",
    "DO",
    "pH",
    "turbidez",
    "materialEmSuspensao",
    "intensidadeLuminosa",
    "dataMedida",
    "horaMedida",
  ],
  tbmedidacamposuperficie: [
    "idMedidaCampoSuperficie",
    "idCampanha",
    "idSitio",
    "secchi",
    "tempAgua",
    "condutividade",
    "DO",
    "pH",
    "turbidez",
    "materialEmSuspensao",
    "dataMedida",
    "horaMedida",
  ],
  tbnutrientessedimento: [
    "idNutrientesSedimento",
    "idCampanha",
    "idSitio",
    "profundidade",
    "batimetria",
    "N2",
    "PT",
    "TC",
    "dataMedida",
    "horaMedida",
  ],
  tbparametrosbiologicosfisicosagua: [
    "idParametrosBiologicosFisicosAgua",
    "idCampanha",
    "idSitio",
    "dataMedida",
    "profundidade",
    "secchi",
    "tempagua",
    "condutividade",
    "DO",
    "pH",
    "turbidez",
    "materialEmSuspensao",
    "DOC",
    "TOC",
    "POC",
    "DIC",
    "NT",
    "PT",
    "densidadeBacteria",
    "biomassaBacteria",
    "clorofilaA",
    "biomassaCarbonoTotalFito",
    "densidadeTotalFito",
    "biomassaZoo",
    "densidadeTotalZoo",
    "producaoFitoplanctonica",
    "carbonoOrganicoExcretado",
    "respiracaoFito",
    "producaoBacteriana",
    "respiracaoBacteriana",
    "taxaSedimentacao",
    "delta13C",
    "delta15N",
    "intensidadeLuminosa",
  ],
};

export const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { table } = req.params;
    const { start, end, responsible_type, responsible_id, columns, limit, page } =
      req.query as Record<string, string>;

    // validação da tabela
    if (!TABLE_WHITELIST[table]) {
      res.status(400).json({ success: false, error: "Tabela inválida." });
      return;
    }

    // colunas permitidas
    const allowedColumns = TABLE_WHITELIST[table];
    let selectedColumns = allowedColumns;

    if (columns) {
      const requested = columns.split(",").map((c) => c.trim());
      const invalid = requested.filter((c) => !allowedColumns.includes(c));
      if (invalid.length > 0) {
        res.status(400).json({
          success: false,
          error: `Colunas inválidas: ${invalid.join(", ")}`,
        });
        return;
      }
      selectedColumns = requested;
    }

    // paginação
    const pageNum = Math.max(1, Number(page) || 1);
    const pageSize = Math.min(Number(limit) || 50, MAX_LIMIT);
    const offset = (pageNum - 1) * pageSize;

    // ordenação
    /*let orderBy = "datamedida DESC";
        if (sort) {
            const [col, dir] = sort.split(":");
            if (allowedColumns.includes(col) && ["asc", "desc"].includes(dir?.toLowerCase())) {
                orderBy = `${col} ${dir.toUpperCase()}`;
            }
        }*/

    // filtros
    const conditions: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (start) {
      conditions.push(`datamedida >= $${idx++}`);
      values.push(start);
    }
    if (end) {
      conditions.push(`datamedida <= $${idx++}`);
      values.push(end);
    }
    if (responsible_type && responsible_id) {
      if (["idcampanha", "idsitio", "idreservatorio", "idinstituicao"].includes(responsible_type)) {
        conditions.push(`${responsible_type} = $${idx++}`);
        values.push(responsible_id);
      }
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // consulta principal
    const query = `
      SELECT ${selectedColumns.join(", ")}
      FROM ${table}
      ${whereClause}
      
      LIMIT $${idx++} OFFSET $${idx++};
    `;

    values.push(pageSize, offset);

    const result = await furnasPool.query(query, values);

    // total
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM ${table}
      ${whereClause};
    `;
    const countResult = await furnasPool.query(countQuery, values.slice(0, values.length - 2));
    const total = Number(countResult.rows[0]?.total || 0);

    res.status(200).json({
      success: true,
      page: pageNum,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao executar getData", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ success: false, error: "Erro interno do servidor." });
  }
};
