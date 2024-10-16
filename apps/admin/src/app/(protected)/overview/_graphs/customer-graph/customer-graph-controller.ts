import { fetchCustomersByProfileId } from "@/db/queries";
import { useAppStore } from "@/store";
import { handleAPIResponse } from "@/utils";
import { Profile } from "@prisma/client";
import { eachWeekOfInterval, format, startOfMonth, subMonths } from "date-fns";
import { useCallback, useEffect, useState } from "react";

const useCustomerGraphController = () => {
  const [rawGraphData, setRawGraphData] = useState<Profile[]>();
  const [graphData, setGraphData] = useState<{ name: string; uv: number }[]>();

  const { profile } = useAppStore();

  /* 1. Fetch raw graph data */
  const handleGetGraphData = useCallback(async () => {
    if (!profile) {
      return;
    }
    try {
      const { id: profileId } = profile;
      const { response, errors } = await fetchCustomersByProfileId(profileId);

      const result = handleAPIResponse(errors, response);

      if (result) {
        setRawGraphData(result);
      }
    } finally {
    }
  }, [profile]);

  // Transform customers to weekly graph data
  const transformCustomersToGraph = (customers: Profile[]) => {
    const startDate = startOfMonth(subMonths(new Date(), 2));
    const endDate = new Date();
    const weeks = eachWeekOfInterval({ start: startDate, end: endDate });

    const weeklyData = weeks.map((weekStart) => {
      // Count customers who registered within this week
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const customersThisWeek = customers.filter((customer) => {
        const createdAt = customer.createdAt;
        return createdAt >= weekStart && createdAt < weekEnd;
      });

      return {
        name: format(weekStart, "yyyy-MM-dd"),
        uv: customersThisWeek.length,
      };
    });

    return weeklyData;
  };

  useEffect(() => {
    if (rawGraphData) {
      const weeklyData = transformCustomersToGraph(rawGraphData);
      setGraphData(weeklyData);
    }
  }, [rawGraphData]);

  useEffect(() => {
    handleGetGraphData();
  }, [handleGetGraphData]);

  return { graphData };
};

export default useCustomerGraphController;
