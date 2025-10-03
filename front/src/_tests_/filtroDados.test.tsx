/*
import { render, screen, fireEvent } from "@testing-library/react";
import { FiltroDados } from "../components/filtroDados";

describe("FiltroDados", () => {
  it("renderiza inputs básicos", () => {
    render(<FiltroDados table="tbabioticocoluna" onApply={jest.fn()} />);
    expect(screen.getByLabelText("Responsável"));
    expect(screen.getByLabelText("Data inicial"));
  });

  it("valida required fields", () => {
    const onApply = jest.fn();
    render(<FiltroDados table="tbabioticocoluna" onApply={onApply} />);
    fireEvent.click(screen.getByText("Gerar Gráfico"));
    expect(onApply).not.toHaveBeenCalled();
    expect(screen.getByText("Obrigatório"));
  });

  it("chama onApply com payload correto", () => {
    const onApply = jest.fn();
    render(<FiltroDados table="tbabioticocoluna" onApply={onApply} />);
    fireEvent.change(screen.getByLabelText("Responsável"), { target: { value: "campanha" } });
    fireEvent.change(screen.getByLabelText("ID do Responsável"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Data inicial"), { target: { value: "2003-11-18" } });
    fireEvent.change(screen.getByLabelText("Data final"), { target: { value: "2004-03-18" } });
    fireEvent.click(screen.getByText("Gerar Gráfico"));

    expect(onApply).toHaveBeenCalledWith({
      start: "2003-11-18",
      end: "2004-03-18",
      responsible_type: "campanha",
      responsible_id: 3,
      columns: [],
    });
  });
});
*/
