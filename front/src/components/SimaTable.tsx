import type { Sima } from "../types/sima";

interface Props {
  data: Sima[];
}

const SimaTable = ({ data }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Estação</th>
          <th>Data/Hora</th>
          <th>Temperatura Ar</th>
          <th>UR</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.idsima}>
            <td>{item.idsima}</td>
            <td>{item.idestacao}</td>
            <td>{new Date(item.datahora).toLocaleString()}</td>
            <td>{item.tempar ?? "-"}</td>
            <td>{item.ur ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimaTable;
