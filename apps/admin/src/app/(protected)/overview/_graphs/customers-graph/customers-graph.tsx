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
import useCustomersGraphController from "./customers-graph-controller";

const CustomersGraph = () => {
  const { graphData, isGraphLoading } = useCustomersGraphController();

  return (
    <>
      <CustomHeaderWithTooltip
        content="Displays the number of customers gain each week"
        header="Weekly customers graph"
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
              dataKey="customers"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </>
  );
};

export default CustomersGraph;
