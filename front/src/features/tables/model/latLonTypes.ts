export type LatLonReservoirPoint = {
  id?: string | number | null;
  latitude?: number | null;
  longitude?: number | null;
  nome?: string;
  raw?: unknown;
};

export type PolygonLike = {
  id?: string;
  points: Array<Record<string, unknown>>;
};
