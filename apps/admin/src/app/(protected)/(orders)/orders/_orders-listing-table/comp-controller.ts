"use client";
import { fetchOrderItemsByProductOwnerId } from "@/db/queries";
import { useAppStore } from "@/store";
import { handleAPIResponse } from "@/utils";
import { OrderItem } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useOrdersListingTableCompController = () => {
  const { profile } = useAppStore();

  const [isFetchAllOrdersLoading, setIsFetchAllOrdersLoading] = useState(true);
  const [ordersList, setOrdersList] = useState<OrderItem[]>([]);

  const router = useRouter();

  const columns: {
    key: keyof OrderItem;
    label?: string;
    className?: string;
    bodyClassName?: string;
    bodyOnClickHandler?: (id: string) => void;
  }[] = [
    {
      key: "id",
      label: "Order ID",
      bodyClassName: "font-semibold cursor-pointer",
      bodyOnClickHandler: (id: string) => router.push(`/orders/${id}`),
    },
    {
      key: "productId",
      label: "Product ID",
    },
    {
      key: "quantity",
    },
    {
      key: "price",
    },
    {
      key: "status",
    },
  ];

  const handleGetOrders = useCallback(async () => {
    if (!profile) {
      return;
    }

    try {
      const { id: profileId } = profile;
      setIsFetchAllOrdersLoading(true);

      const { errors, response } =
        await fetchOrderItemsByProductOwnerId(profileId);

      const result = handleAPIResponse(errors, response);

      if (result) {
        setOrdersList(result);
      }
    } finally {
      setIsFetchAllOrdersLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    handleGetOrders();
  }, [handleGetOrders]);

  return { isFetchAllOrdersLoading, ordersList, columns };
};

export default useOrdersListingTableCompController;
