import type { ColumnMeta } from "../api/simaTablesClient";

export type SimaTablesTooltipState = {
  visible: boolean;
  left: number;
  top: number;
  instituicao?: string;
  reservatorio?: string;
  color?: string;
  value?: number | string;
  stations?: string[];
  page?: number;
};

export type SimaTablesUiState = {
  stage: number;
  selectedStations: string[];
  selectAllStations: boolean;
  table: "tbsima" | "tbsimaoffline";
  availableDates: string[];
  startDate: string;
  endDate: string;
  columnsForTable: ColumnMeta[];
  selectedColumns: string[];
  chartData: Record<string, unknown>[] | null;
  dataForTablePreview: Record<string, unknown>[] | null;
  view: "chart" | "map" | "table";
  loading: boolean;
  showTableView: boolean;
  page: number;
  zoom: number;
  pan: { x: number; y: number };
};

export const initialSimaTablesUiState: SimaTablesUiState = {
  stage: 1,
  selectedStations: [],
  selectAllStations: false,
  table: "tbsima",
  availableDates: [],
  startDate: "",
  endDate: "",
  columnsForTable: [],
  selectedColumns: [],
  chartData: null,
  dataForTablePreview: null,
  view: "chart",
  loading: false,
  showTableView: false,
  page: 0,
  zoom: 1,
  pan: { x: 0, y: 0 },
};

export type SimaTablesUiAction =
  | { type: "patch"; patch: Partial<SimaTablesUiState> }
  | { type: "resetWizard" }
  | { type: "panDelta"; dx: number; dy: number };

export function simaTablesUiReducer(
  state: SimaTablesUiState,
  action: SimaTablesUiAction,
): SimaTablesUiState {
  if (action.type === "patch") {
    return { ...state, ...action.patch };
  }
  if (action.type === "panDelta") {
    return {
      ...state,
      pan: { x: state.pan.x + action.dx, y: state.pan.y + action.dy },
    };
  }
  if (action.type === "resetWizard") {
    return {
      ...initialSimaTablesUiState,
    };
  }
  return state;
}
