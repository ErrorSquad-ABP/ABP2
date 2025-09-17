import { useEffect, useState } from "react";
import { getSima } from "../api/simaApi";
import type { Sima, PaginatedResponse } from "../types/sima";
import styled from "styled-components";

// Container principal da página
const PageContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 1.5rem;
  background-color: #f3f4f6;
`;

// Título
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #111827;
`;

// Tabela
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }
`;

// Paginação
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const Button = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "#9ca3af" : "#2563eb")};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#9ca3af" : "#1d4ed8")};
  }
`;

function SimaPage() {
  const [data, setData] = useState<Sima[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: PaginatedResponse<Sima> = await getSima(page, 10);
        setData(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Erro ao carregar registros:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <PageContainer>
      <Title>Lista de Registros - SIMA</Title>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Estação</Th>
            <Th>Data/Hora</Th>
            <Th>Temperatura</Th>
            <Th>Precipitação</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <Tr key={row.idsima}>
              <Td>{row.idsima}</Td>
              <Td>{row.idestacao}</Td>
              <Td>{row.datahora}</Td>
              <Td>{row.tempar ?? "-"}</Td>
              <Td>{row.precipitacao ?? "-"}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </Button>
        <span>
          Página {page} de {totalPages}
        </span>
        <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Próxima
        </Button>
      </Pagination>
    </PageContainer>
  );
}

export default SimaPage;
