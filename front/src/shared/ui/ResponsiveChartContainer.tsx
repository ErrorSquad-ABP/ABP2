import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ResponsiveChartContainer({ data, columns }) {
  if (!data?.length) {
    return (
      <div className="text-center text-sm text-gray-500 py-8">
        Nenhum dado disponível para o período selecionado.
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dataHora" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          {columns.map((col, idx) => (
            <Line
              key={col}
              type="monotone"
              dataKey={col}
              strokeWidth={2}
              stroke={`hsl(${idx * 60},70%,50%)`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
