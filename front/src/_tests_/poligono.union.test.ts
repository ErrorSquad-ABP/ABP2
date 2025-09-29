// front/src/__tests__/poligono.union.test.ts

import { Poligono } from "../models/Poligono";

describe("Classe Poligono", () => {
  it("calcula área corretamente para um quadrado 1x1", () => {
    const quadrado = new Poligono([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ]);

    expect(quadrado.calcularArea()).toBe(1);
  });

  it("calcula perímetro corretamente para um quadrado 1x1", () => {
    const quadrado = new Poligono([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ]);

    expect(quadrado.calcularPerimetro()).toBe(4);
  });

  it("calcula centroide corretamente para um quadrado 1x1", () => {
    const quadrado = new Poligono([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ]);

    expect(quadrado.calcularCentroide()).toEqual({ x: 0.5, y: 0.5 });
  });

  it("faz união simplificada de dois quadrados lado a lado", () => {
    const q1 = new Poligono([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ]);

    const q2 = new Poligono([
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 0 },
    ]);

    const uniao = q1.union(q2);

    // bounding box deve ser de (0,0) até (2,1)
    expect(uniao.vertices).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 0 },
    ]);
    expect(uniao.calcularArea()).toBe(2);
  });
});
