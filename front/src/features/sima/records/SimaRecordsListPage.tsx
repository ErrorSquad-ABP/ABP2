import { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getSima } from "@/api/simaApi";
import SimaTable from "@/shared/ui/SimaTable";
import type { Sima } from "@/types/sima";

const PageContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 1.5rem;
  background-color: #f3f4f6;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #111827;
`;

export default function SimaRecordsListPage() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sima", "records", page, pageSize],
    queryFn: () => getSima(page, pageSize),
  });

  const rows: Sima[] = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <PageContainer>
      <Title>Lista de Registros - SIMA</Title>

      {isError ? (
        <div style={{ color: "#b91c1c", marginBottom: 12 }}>
          Erro ao carregar registros: {error instanceof Error ? error.message : "desconhecido"}
        </div>
      ) : null}

      <SimaTable
        data={rows}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        columns={[
          { key: "idsima", label: "ID", sortable: true },
          { key: "idestacao", label: "Estação", sortable: true },
          {
            key: "datahora",
            label: "Data/Hora",
            sortable: true,
            render: (v) => <> {new Date(String(v)).toLocaleString()} </>,
          },
          { key: "tempar", label: "Temperatura", sortable: true },
          { key: "precipitacao", label: "Precipitação", sortable: true },
        ]}
      />

      <div style={{ marginTop: 12, color: "#475569", fontSize: 13, textAlign: "center" }}>
        {isLoading ? "Carregando…" : `Página ${page} de ${totalPages}`}
      </div>
    </PageContainer>
  );
}
