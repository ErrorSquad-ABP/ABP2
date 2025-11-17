// front/src/hooks/usePolygonStore.ts
import { useState, useCallback } from "react";
import { polygonStore, Polygon } from "../data-structures/IntersectionPolygonStore";

export const usePolygonStore = () => {
  const [polygons, setPolygons] = useState<Polygon[]>(() => polygonStore.buscarTodos());

  const adicionarPoligono = useCallback((poligono: Omit<Polygon, "id">) => {
    const novo = polygonStore.adicionarPoligono(poligono);
    setPolygons(polygonStore.buscarTodos());
    return novo;
  }, []);

  const removerPoligono = useCallback((id: string) => {
    const result = polygonStore.removerPoligono(id);
    setPolygons(polygonStore.buscarTodos());
    return result;
  }, []);

  return {
    polygons,
    adicionarPoligono,
    removerPoligono,
    buscarPorId: polygonStore.buscarPorId.bind(polygonStore),
    atualizarPoligono: (id: string, updates: Partial<Omit<Polygon, "id">>) => {
      const result = polygonStore.atualizarPoligono(id, updates);
      setPolygons(polygonStore.buscarTodos());
      return result;
    },
    quantidade: polygonStore.getQuantidade(),
  };
};
