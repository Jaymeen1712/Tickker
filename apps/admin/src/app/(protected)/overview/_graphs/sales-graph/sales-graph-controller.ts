import { fetchWeeklySoldProductsByProfileId } from "@/db/queries";
import { useAppStore } from "@/store";
import { handleAPIResponse } from "@/utils";
import { startOfMonth, subMonths } from "date-fns";
import { useCallback, useEffect, useState } from "react";

const useSalesGraphController = () => {
  const [graphData, setGraphData] =
    useState<{ date: string; sales: number }[]>();
  const [isGraphLoading, setIsGraphLoading] = useState(true);

  const { profile } = useAppStore();

  /* 1. Fetch graph data */
  const handleGetGraphData = useCallback(async () => {
    if (!profile) {
      return;
    }
    try {
      setIsGraphLoading(true);
      const { id: profileId } = profile;
      const { response, errors } = await fetchWeeklySoldProductsByProfileId({
        profileId,
        startDate: startOfMonth(subMonths(new Date(), 2)),
        endDate: new Date(),
      });

      const result = handleAPIResponse(errors, response);

      if (result) {
        setGraphData(result);
      }
    } finally {
      setIsGraphLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    handleGetGraphData();
  }, [handleGetGraphData]);

  return { graphData, isGraphLoading };
};

export default useSalesGraphController;
