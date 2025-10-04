import { balcarPool } from "../../configs/db";
import { Request, Response } from "express";
import { logger } from "../../configs/logger";


export const getTabela = async (req: Request, res: Response): Promise<void> => {
   try {
    
    

    const tabela = req.params.tabela;

    const queryColumns:any = req.query.colunas
    
    const columns = queryColumns ? `${queryColumns}` : '*'

    const query = `SELECT ${columns} FROM ${tabela}`

      const result = await balcarPool.query(query);
      const resultData = result.rows;

     res.status(200).json({
      colunas:queryColumns,data: resultData
    })
  } 
    catch (error: any) {
        logger.error("Erro ao consultar tbfluxoinpe", {
          message: error.message,
          stack: error.stack,
        });
  };
}
