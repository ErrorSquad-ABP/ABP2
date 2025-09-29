import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiltroDadosProps, AppliedFilters } from "../types/filtroDados";
import { fetchMetadata, fetchColumns } from "../api/filtroApi"; // wrappers para GET /tables/:table/metadata e /columns

// ====== Styled Components ======
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 0.8rem;
`;

// ====== Subcomponentes ======
const DateInput = ({ label, value, onChange, min, max, error }: any) => (
  <div>
    <Label>
      {label}
      <input
        type="date"
        value={value || ""}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
      />
    </Label>
    {error && <ErrorMsg>{error}</ErrorMsg>}
  </div>
);

const Select = ({ label, value, options, onChange, error }: any) => (
  <div>
    <Label>
      {label}
      <select value={value || ""} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error}>
        <option value="">Selecione...</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Label>
    {error && <ErrorMsg>{error}</ErrorMsg>}
  </div>
);

const MultiSelect = ({ label, values, options, onChange }: any) => (
  <div>
    <Label>{label}</Label>
    <select
      multiple
      value={values}
      onChange={(e) => onChange(Array.from(e.target.selectedOptions, (o) => o.value))}
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// ====== Componente principal ======
export const FiltroDados: React.FC<FiltroDadosProps> = ({ table, initial, onApply, onReset }) => {
  const [responsibleType, setResponsibleType] = useState(initial?.responsibleType || "");
  const [responsibleId, setResponsibleId] = useState(initial?.responsibleId || 0);
  const [start, setStart] = useState(initial?.start || "");
  const [end, setEnd] = useState(initial?.end || "");
  const [columns, setColumns] = useState(initial?.columns || []);

  const [metadata, setMetadata] = useState<any>(null);
  const [availableColumns, setAvailableColumns] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});

  // Fetch metadata (minDate, maxDate, responsáveis)
  useEffect(() => {
    fetchMetadata(table).then(setMetadata).catch(console.error);
    fetchColumns(table).then(setAvailableColumns).catch(console.error);
  }, [table]);

  const validate = () => {
    const errs: any = {};
    if (!responsibleType) errs.responsibleType = "Obrigatório";
    if (!responsibleId) errs.responsibleId = "Obrigatório";
    if (!start) errs.start = "Obrigatório";
    if (!end) errs.end = "Obrigatório";
    if (start && end && start > end) errs.end = "Data final deve ser >= inicial";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleApply = () => {
    if (!validate()) return;
    const payload: AppliedFilters = {
      start,
      end,
      responsible_type: responsibleType,
      responsible_id: responsibleId,
      columns,
    };
    onApply(payload);
  };

  const handleReset = () => {
    setResponsibleType("");
    setResponsibleId(0);
    setStart("");
    setEnd("");
    setColumns([]);
    setErrors({});
    onReset?.();
  };

  return (
    <Wrapper>
      <Row>
        <Select
          label="Responsável"
          value={responsibleType}
          onChange={setResponsibleType}
          options={[
            { value: "campanha", label: "Campanha" },
            { value: "sitio", label: "Sítio" },
            { value: "reservatorio", label: "Reservatório" },
            { value: "instituicao", label: "Instituição" },
          ]}
          error={errors.responsibleType}
        />

        {/* responsável ID */}
        <Select
          label="ID do Responsável"
          value={responsibleId}
          onChange={(v: string) => setResponsibleId(Number(v))}
          options={(metadata?.responsaveis?.[responsibleType] || []).map((r: any) => ({
            value: r.id,
            label: r.nome,
          }))}
          error={errors.responsibleId}
        />
      </Row>

      <Row>
        <DateInput
          label="Data inicial"
          value={start}
          min={metadata?.minDate}
          max={metadata?.maxDate}
          onChange={setStart}
          error={errors.start}
        />
        <DateInput
          label="Data final"
          value={end}
          min={metadata?.minDate}
          max={metadata?.maxDate}
          onChange={setEnd}
          error={errors.end}
        />
      </Row>

      <Row>
        <MultiSelect
          label="Colunas"
          values={columns}
          onChange={setColumns}
          options={availableColumns.map((c) => ({ value: c, label: c }))}
        />
      </Row>

      <Row>
        <button
          onClick={handleApply}
          disabled={!responsibleType || !responsibleId || !start || !end}
        >
          Gerar Gráfico
        </button>
        <button onClick={handleReset}>Reset</button>
      </Row>
    </Wrapper>
  );
};
