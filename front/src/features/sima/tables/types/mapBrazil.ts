import type { ComponentType } from "react";

export type SimaMapPoint = { id: string | number; lat: number; lon: number; label?: string };

export type SimaMapBrazilProps = {
  height?: number;
  showPolygons?: boolean;
  points?: SimaMapPoint[];
  showPoints?: boolean;
};

export type SimaMapBrazilComponent = ComponentType<SimaMapBrazilProps>;
