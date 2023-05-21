import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { date: "01/01/2023", value: 5 },
  { date: "02/01/2023", value: 8 },
  { date: "03/01/2023", value: 10 },
  { date: "04/01/2023", value: 6 },
  { date: "05/01/2023", value: 12 },
];

export const TransactionChart = () => {
  return (
    <div className="my-4 ml-8">
      <ResponsiveContainer width="95%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ECB71" />
              <stop offset="100%" stopColor="#000000" />
              <stop offset="50%" stopColor="#333333" />
            </linearGradient>
          </defs>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4ECB71"
            fill="url(#gradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
