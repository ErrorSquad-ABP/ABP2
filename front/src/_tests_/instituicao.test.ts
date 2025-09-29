import { Instituicao } from "../models/instituicao.ts";
import { IReservatorio } from "../types/reservatorio.ts";

describe("Instituicao", () => {
  let reservatorioA: IReservatorio;
  let reservatorioB: IReservatorio;

  beforeEach(() => {
    reservatorioA = { id: 1, nome: "Represa A", instituicaoId: 1, responsavel: "INPE" };
    reservatorioB = { id: 2, nome: "Represa B", instituicaoId: 1, responsavel: "INPE" };
  });

  it("deve criar uma Instituicao com reservatórios", () => {
    const instituicao = new Instituicao(1, "INPE", "INPE", [reservatorioA]);
    expect(instituicao.getId()).toBe(1);
    expect(instituicao.getNome()).toBe("INPE");
    expect(instituicao.getReservatorios()).toHaveLength(1);
  });

  it("deve adicionar um reservatório", () => {
    const instituicao = new Instituicao(1, "INPE");
    instituicao.addReservatorio(reservatorioA);
    expect(instituicao.getReservatorios()).toContainEqual(reservatorioA);
  });

  it("deve remover um reservatório existente por id", () => {
    const instituicao = new Instituicao(1, "INPE", "INPE", [reservatorioA, reservatorioB]);
    const removed = instituicao.removeReservatorioById(1);
    expect(removed).toBe(true);
    expect(instituicao.getReservatorios()).toHaveLength(1);
    expect(instituicao.findReservatorio(1)).toBeUndefined();
  });

  it("não deve remover se o reservatório não existir", () => {
    const instituicao = new Instituicao(1, "INPE", "INPE", [reservatorioA]);
    const removed = instituicao.removeReservatorioById(999);
    expect(removed).toBe(false);
    expect(instituicao.getReservatorios()).toHaveLength(1);
  });

  it("deve encontrar um reservatório pelo id", () => {
    const instituicao = new Instituicao(1, "INPE", "INPE", [reservatorioA]);
    const found = instituicao.findReservatorio(1);
    expect(found).toEqual(reservatorioA);
  });

  it("deve serializar para JSON corretamente", () => {
    const instituicao = new Instituicao(1, "INPE", "INPE", [reservatorioA]);
    const json = instituicao.toJSON();
    expect(json).toEqual({
      id: 1,
      nome: "INPE",
      sigla: "INPE",
      reservatorios: [reservatorioA],
    });
  });
});
