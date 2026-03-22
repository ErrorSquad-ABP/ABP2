import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSima } from "../../api/simaApi";
import SimaTable from "../../components/SimaTable";
import type { Sima, PaginatedResponse } from "../../types/sima";

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
  const [data, setData] = useState<Sima[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: PaginatedResponse<Sima> = await getSima(page, 10);
        setData(response.data);
        setTotalPages(response.totalPages ?? 1);
      } catch (error) {
        console.error("Erro ao carregar registros:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <PageContainer>
      <Title>Lista de Registros - SIMA</Title>

      <SimaTable
        data={data}
        page={page}
        pageSize={10}
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
        Página {page} de {totalPages}
      </div>
    </PageContainer>
  );
}
