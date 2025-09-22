

// front/src/pages/TablesPage.tsx
// ------------------------------
// Página para: /tables/:slug
// Esta página é um esqueleto funcional que você deverá ligar à API:
// - GET /api/categories/:slug/tables -> lista de tabelas
// - GET /api/tables/:table/columns -> lista de colunas (schema)
// - GET /api/tables/:table/data?filters... -> dados para gráficos / export

import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

type TableMeta = {
  id: string;
  name: string;
  description?: string;
};

const MOCK_TABLES: Record<string, TableMeta[]> = {
  abioticos: [
    { id: "tbabioticocoluna", name: "tbabioticocoluna", description: "Medições na coluna d'água (profundidade, DIC, delta15N, etc.)" },
    { id: "tbabioticosuperficie", name: "tbabioticosuperficie", description: "Medições na superfície" },
  ],
  bioticos: [
    { id: "tbbioticocoluna", name: "tbbioticocoluna", description: "Parâmetros biológicos na coluna" },
    { id: "tbbioticosuperficie", name: "tbbioticosuperficie", description: "Parâmetros biológicos na superfície" },
  ],
};

const MOCK_COLUMNS: Record<string, string[]> = {
  tbabioticocoluna: ["datamedida", "horamedida", "profundidade", "dic", "delta15n", "nt", "pt"],
  tbabioticosuperficie: ["datamedida", "profundidade", "ph", "oxigenio"],
};

export default function TablesPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const [tables, setTables] = useState<TableMeta[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedCols, setSelectedCols] = useState<Record<string, boolean>>({});
  const [responsible, setResponsible] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    // substituir por fetch real -> GET /api/categories/:slug/tables
    if (!slug) return;
    const list = MOCK_TABLES[slug] || [];
    setTables(list);
    setSelectedTable(list.length ? list[0].id : null);
  }, [slug]);

  useEffect(() => {
    if (!selectedTable) {
      setColumns([]);
      return;
    }
    // substituir por fetch real -> GET /api/tables/:table/columns
    const cols = MOCK_COLUMNS[selectedTable] || [];
    setColumns(cols);
    const initial: Record<string, boolean> = {};
    cols.forEach((c) => (initial[c] = false));
    setSelectedCols(initial);
  }, [selectedTable]);

  const anyColumnSelected = useMemo(() => Object.values(selectedCols).some(Boolean), [selectedCols]);

  const toggleCol = (col: string) => {
    setSelectedCols((s) => ({ ...s, [col]: !s[col] }));
  };

  return (
    <Wrap>
      <Header>
        <div>
          <h2>{slug ? `Tópico: ${slug}` : "Tabelas"}</h2>
          <p>Escolha a tabela, selecione o responsável, período e colunas para gerar gráficos ou exportar.</p>
        </div>
      </Header>

      <Content>
        <Left>
          <Section>
            <label>Tabelas disponíveis</label>
            <List>
              {tables.length === 0 && <Empty>Nenhuma tabela cadastrada para este tópico.</Empty>}
              {tables.map((t) => (
                <ListItem key={t.id} onClick={() => setSelectedTable(t.id)} active={selectedTable === t.id}>
                  <strong>{t.name}</strong>
                  <small>{t.description}</small>
                </ListItem>
              ))}
            </List>
          </Section>

          <Section>
            <label>Responsável pelo dado (obrigatório)</label>
            <select value={responsible} onChange={(e) => setResponsible(e.target.value)}>
              <option value="">-- selecione --</option>
              <option value="campanha">Campanha</option>
              <option value="sitio">Sítio</option>
              <option value="reservatorio">Reservatório</option>
              <option value="instituicao">Instituição</option>
            </select>
          </Section>

          <Section>
            <label>Período (obrigatório)</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </Section>
        </Left>

        <Right>
          <Section>
            <label>Esquema de colunas ({columns.length})</label>
            {columns.length === 0 && <Empty>Selecione uma tabela para ver as colunas.</Empty>}
            <Columns>
              {columns.map((col) => (
                <ColumnItem key={col}>
                  <input id={`col_${col}`} type="checkbox" checked={!!selectedCols[col]} onChange={() => toggleCol(col)} />
                  <label htmlFor={`col_${col}`}>{col}</label>
                </ColumnItem>
              ))}
            </Columns>
          </Section>

          <Actions>
            <div>
              <button disabled={!anyColumnSelected || !responsible || !startDate || !endDate}>Gerar gráfico</button>
              <button disabled={!anyColumnSelected || !responsible || !startDate || !endDate}>Exportar CSV</button>
              <button disabled={!anyColumnSelected || !responsible || !startDate || !endDate}>Exportar JSON</button>
            </div>
            <p style={{ marginTop: 8, color: "#6b7280" }}>
              Observação: filtros obrigatórios — responsável e período. Integre com a API para habilitar a exportação e geração de gráficos.
            </p>
          </Actions>
        </Right>
      </Content>
    </Wrap>
  );
}

// ================= Styled (TablesPage) =================
const Wrap = styled.div`max-width:1100px;margin:24px auto;padding:12px;`;
const Header = styled.header`display:flex;gap:18px;align-items:flex-start;h2{margin:0;color:#062244}p{margin:4px 0 0;color:#475569}`;
const Content = styled.div`display:grid;grid-template-columns:340px 1fr;gap:20px;margin-top:18px;@media(max-width:900px){grid-template-columns:1fr;}`;
const Left = styled.aside``;
const Right = styled.section``;
const Section = styled.div`background:#fff;border:1px solid #e6eef8;padding:14px;border-radius:10px;margin-bottom:12px;label{display:block;font-weight:600;margin-bottom:8px;color:#0b2b59}`;
const List = styled.ul`list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;`;
const ListItem = styled.li<{ active?: boolean }>`padding:10px;border-radius:8px;border:1px solid ${({ active }) => (active ? '#c7e0ff' : '#eef4fb')};background:${({ active }) => (active ? '#f0f9ff' : 'transparent')};cursor:pointer;display:flex;flex-direction:column;gap:6px;strong{font-size:14px}small{font-size:12px;color:#6b7280}`;
const Empty = styled.div`padding:10px;color:#64748b`;
const Columns = styled.div`display:flex;flex-direction:column;gap:8px;max-height:320px;overflow:auto;padding-top:6px`;
const ColumnItem = styled.div`display:flex;align-items:center;gap:8px;font-size:14px;color:#0b2b59`;
const Actions = styled.div`display:flex;flex-direction:column;gap:12px;button{background:#2563eb;color:#fff;border:none;padding:10px 14px;border-radius:8px;cursor:pointer;font-weight:600;}&button:disabled{opacity:0.6}
`;

/*
  Instruções de integração:
  - Copie o primeiro bloco para: front/src/pages/HomePage.tsx
  - Copie o segundo bloco (TablesPage) para: front/src/pages/TablesPage.tsx
  - Adicione a rota no App.tsx: <Route path="/tables/:slug" element={<TablesPage />} />
  - Substitua as chamadas MOCK_* por requisições reais à sua API (axios/fetch).  
*/
     

