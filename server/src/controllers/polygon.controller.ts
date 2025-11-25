// server/src/controllers/polygon.controller.ts
import { Request, Response } from "express";
import { polygonStore, Polygon } from "../data-structures/IntersectionPolygonStore";

interface Resp  {
  success: Boolean;
  data: any;
  total: any;
  error?: String;
}

export const criarPoligono = (req: Request, res: Response): void => {
  try {
    const { name, coordinates, type, metadata } = req.body;

    const poligono = polygonStore.adicionarPoligono({
      name,
      coordinates,
      type,
      metadata,
    });

    res.status(201).json({
      success: true,
      data: poligono,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const listarPoligonos = (req: Request, res: Response): void => {
  const poligonos = polygonStore.buscarTodos();

  const response : Resp = {
    success: true,
    data: poligonos,
    total: polygonStore.getQuantidade()
  }

  res.status(200).json(
    response
  );
};
