"use client";
import { fetchOrdersByProfileId } from "@/db/queries";
import { useAppStore } from "@/store";
import { OrderIncludingOrderItemsIncludingProductType } from "@/types";
import { handleAPIResponse } from "@/utils";
import { useCallback, useEffect, useState } from "react";

const useOrdersPageController = () => {
  const [orders, setOrders] = useState<
    OrderIncludingOrderItemsIncludingProductType[]
  >([]);

  const { profile, setIsLoading, isLoading } = useAppStore();

  const handleGetOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!profile) {
        return;
      }

      const { id: profileId } = profile;

      const { errors, response } = await fetchOrdersByProfileId({
        profileId,
      });

      const result = handleAPIResponse(errors, response);

      if (result) {
        setOrders(result);
      }
    } finally {
      setIsLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    handleGetOrders();
  }, [handleGetOrders]);

  useEffect(() => {
    return () => {
      setIsLoading(true);
    };
  }, [setIsLoading]);

  return { orders, isLoading };
};

export default useOrdersPageController;
