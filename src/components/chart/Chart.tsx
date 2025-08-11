import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { chartData } from "@/interface/chartData";

interface Props {
  data: chartData[];
}

export const Chart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className="flex-1/4">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nombre" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="linear"
          dataKey="puntos"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
