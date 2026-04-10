/* eslint-disable @typescript-eslint/no-explicit-any -- linhas crus de tbcampanha */
import { getField, isoDate } from "../../../utils/limnologicData";

/** Datas distintas (ordenadas) para reservatórios selecionados a partir das linhas de tbcampanha. */
export function availableDatesForTableAndReservatorios(
  rows: any[],
  selectedReservatorios: (string | number)[],
): string[] {
  if (!selectedReservatorios.length) return [];

  const selectedSet = new Set(selectedReservatorios.map(String));
  const foundDates = new Set<string>();

  for (const r of rows) {
    const rid = getField(r, [
      "idreservatorio",
      "id_reservatorio",
      "idReservatorio",
      "reservatorio",
    ]);
    if (rid != null && selectedSet.size && !selectedSet.has(String(rid))) continue;

    const dtRaw = getField(r, ["datainicio", "dataMedida", "dataHora", "data", "datahora"]);
    if (!dtRaw) continue;

    const d = new Date(dtRaw);
    if (!isNaN(d.getTime())) foundDates.add(isoDate(d));
    else {
      const maybe = String(dtRaw).slice(0, 10);
      if (/^\d{4}-\d{2}-\d{2}$/.test(maybe)) foundDates.add(maybe);
    }
  }

  return Array.from(foundDates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}

/** Variante usada quando só há seleção de reservatórios (sem passar nome de tabela). */
export function availableDatesForSelectedReservatoriosOnly(
  rows: any[],
  reservs: (string | number)[],
  campanhas: any[],
): string[] {
  if (!reservs.length) return [];

  const filteredDates = new Set<string>();
  const selectedSet = new Set(reservs.map((r) => String(r)));

  for (const r of rows) {
    const rid = getField(r, [
      "idreservatorio",
      "id_reservatorio",
      "idReservatorio",
      "reservatorio",
    ]);
    if (!rid && campanhas && campanhas.length) {
      continue;
    }
    if (rid && !selectedSet.has(String(rid)) && reservs.length !== rows.length) continue;

    const dtRaw = getField(r, ["datainicio", "dataMedida", "dataHora", "data", "datahora"]);
    if (!dtRaw) continue;
    const d = new Date(dtRaw);
    if (!isNaN(d.getTime())) filteredDates.add(isoDate(d));
  }

  return Array.from(filteredDates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}
