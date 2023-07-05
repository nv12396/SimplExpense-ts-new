import moment from "moment";
import {
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
} from "recharts";

import { useGetChartData } from "../transactions/api/getChartData";
import { Spinner } from "../../components/Elements/Spinner/Spinner";

export const TransactionChart = () => {
  const { data: chartData, isLoading } = useGetChartData();
  let maxTotalAmount = 0;
  if (chartData && chartData.length > 0) {
    maxTotalAmount = Math.max(...chartData.map((data) => data.totalAmount));
  }

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center container mx-auto md:w-[80%]">
      <div className="w-full">
        <ResponsiveContainer width="100%" height={180} className="chart">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#82ccdd" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="_id"
              tickFormatter={(date) => moment(date).format("DD/MM")}
            />
            <YAxis domain={[0, maxTotalAmount]} hide={true} />
            <Tooltip labelFormatter={(date) => moment(date).format("DD/MM")} />

            <Area
              type="monotone"
              dataKey="totalAmount"
              stroke="#4ECB71"
              fill="url(#gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
