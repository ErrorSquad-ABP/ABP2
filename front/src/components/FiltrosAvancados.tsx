// front/src/components/FiltrosAvancados.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getReservatorios } from "../api/simaApi"; // ajustar depois conforme api disponível

interface FiltrosProps {
    onApply: (filtros: {
        dataInicio: string;
        dataFim: string;
        reservatorio: string;
    }) => void;
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  padding: 0.6rem 1rem;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #004c99;
  }
`;

const FiltrosAvancados: React.FC<FiltrosProps> = ({ onApply }) => {
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [reservatorio, setReservatorio] = useState("");
    const [reservatorios, setReservatorios] = useState<{ id: string; nome: string }[]>([]);

    useEffect(() => {
        const fetchReservatorios = async () => {
            try {
                const data = await getReservatorios(); // endpoint precisa existir em simaApi
                setReservatorios(data);
            } catch (error) {
                console.error("Erro ao carregar reservatórios", error);
            }
        };

        fetchReservatorios();
    }, []);

    const aplicarFiltros = () => {
        onApply({ dataInicio, dataFim, reservatorio });
    };

    return (
        <Container>
            <div>
                <label>Data Início:</label>
                <Input
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                />
            </div>
            <div>
                <label>Data Fim:</label>
                <Input
                    type="date"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                />
            </div>
            <div>
                <label>Reservatório:</label>
                <Select
                    value={reservatorio}
                    onChange={(e) => setReservatorio(e.target.value)}
                >
                    <option value="">Selecione</option>
                    {reservatorios.map((res) => (
                        <option key={res.id} value={res.id}>
                            {res.nome}
                        </option>
                    ))}
                </Select>
            </div>
            <Button onClick={aplicarFiltros}>Aplicar</Button>
        </Container>
    );
};

export default FiltrosAvancados;
