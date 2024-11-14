"use client";
import { fetchOrdersByProfileId } from "@/db/queries";
import { useAppStore } from "@/store";
import { OrderIncludingOrderItemsIncludingProductType } from "@/types";
import { handleAPIResponse } from "@/utils";
import { useCallback, useEffect, useState } from "react";

const useOrdersPageController = () => {
  const [orders, setOrders] = useState<
    OrderIncludingOrderItemsIncludingProductType[] | undefined
  >();
  const [isScrolled, setIsScrolled] = useState(false);

  const { profile } = useAppStore();

  const handleGetOrders = useCallback(async () => {
    if (!profile) {
      return;
    }

    try {
      const { id: profileId } = profile;

      const { errors, response } = await fetchOrdersByProfileId({
        profileId,
      });

      const result = handleAPIResponse(errors, response);

      if (result) {
        setOrders(result);
      }
    } finally {
    }
  }, [profile]);

  useEffect(() => {
    handleGetOrders();
  }, [handleGetOrders]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { orders, isScrolled };
};

export default useOrdersPageController;
