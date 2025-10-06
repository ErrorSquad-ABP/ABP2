import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";

export const getMapGeoJSON = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { table } = req.params;
    const { start, end, responsible_type, responsible_id, limit } = req.query;

    let sql = `
      SELECT 
        ST_AsGeoJSON(ST_Transform(geometry, 4326))::json AS geometry,
        row_to_json(t) - 'geometry' AS properties
      FROM ${table} t
      WHERE 1=1
    `;

    const params: any[] = [];

    if (start) {
      params.push(start);
      sql += ` AND date >= $${params.length}`;
    }

    if (end) {
      params.push(end);
      sql += ` AND date <= $${params.length}`;
    }

    if (responsible_type) {
      params.push(responsible_type);
      sql += ` AND responsible_type = $${params.length}`;
    }

    if (responsible_id) {
      params.push(responsible_id);
      sql += ` AND responsible_id = $${params.length}`;
    }

    if (limit) {
      params.push(limit);
      sql += ` LIMIT $${params.length}`;
    }

    const result = await furnasPool.query(sql, params);

    const geoJSON = {
      type: "FeatureCollection",
      features: result.rows.map((row: any) => ({
        type: "Feature",
        geometry: row.geometry,
        properties: row.properties,
      })),
    };

    return res.json(geoJSON);
  } catch (error) {
    console.error("Erro no getMapGeoJSON:", error);
    return res.status(500).json({ error: "Erro ao gerar GeoJSON" });
  }
};
