// front/src/types/FiltroDados.ts
export interface AppliedFilters {
  start: string;
  end: string;
  responsible_type: string;
  responsible_id: number;
  columns: string[];
}

export interface FiltroDadosProps {
  table: string;
  initial?: {
    start?: string;
    end?: string;
    responsibleType?: string;
    responsibleId?: number;
    columns?: string[];
  };
  onApply: (filters: AppliedFilters) => void;
  onReset?: () => void;
}
