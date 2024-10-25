"use client";
import { CustomHeaderWithTooltip, Spinner } from "@/components";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useRevenueGraphController from "./revenue-graph-controller";

const RevenueGraph = () => {
  const { graphData, isGraphLoading } = useRevenueGraphController();

  return (
    <>
      <CustomHeaderWithTooltip
        content="Shows the revenue generated each week"
        header="Weekly revenue chart"
      />
      <ResponsiveContainer width={"100%"} height={400}>
        {isGraphLoading ? (
          <Spinner containerClassName="h-full" />
        ) : (
          <AreaChart
            data={graphData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" dy={15} />
            <YAxis dx={-10} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1d4ed8"
              fill="#1d4ed8"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </>
  );
};

export default RevenueGraph;
