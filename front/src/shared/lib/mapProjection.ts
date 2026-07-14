/**
 * Parâmetros da projeção Mercator do mapa, compartilhados por todos os pontos
 * que projetam coordenadas (o componente MapSvg e o desenho de polígonos da
 * página de tabelas). Precisam ser idênticos em todos os consumidores, senão a
 * conversão tela ↔ lon/lat desalinha silenciosamente.
 */
export const MAP_PROJECTION_SCALE = 300;
export const MAP_PROJECTION_CENTER: [number, number] = [0, 20];
export const MAP_VERTICAL_TRANSLATE_DIVISOR = 1.8;

/** Largura mínima (px) usada como piso do viewport do mapa. */
export const MAP_MIN_WIDTH_PX = 800;
