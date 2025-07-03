import { useStatisticTransactionByYear } from "@/hooks/react-query-hooks/use-statisitc";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview({ year }: { year: string }) {
  const { data, isPending } = useStatisticTransactionByYear({
    year: Number(year),
  });
  let dataChart: any[] = [];
  if (data && !isPending) {
    dataChart = data.totals.map((item, index) => {
      return {
        name: `Th${index + 1}`,
        total: item,
      };
    });
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={dataChart}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />

        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
