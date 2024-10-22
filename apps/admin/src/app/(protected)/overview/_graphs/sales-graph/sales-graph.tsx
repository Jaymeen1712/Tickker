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
import useSalesGraphController from "./sales-graph-controller";

const SalesGraph = () => {
  const { graphData, isGraphLoading } = useSalesGraphController();

  return (
    <>
      <CustomHeaderWithTooltip
        content="Displays the number of products sold each week"
        header="Weekly sales graph"
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
              dataKey="sales"
              stroke="#1d4ed8"
              fill="#1d4ed8"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </>
  );
};

export default SalesGraph;
