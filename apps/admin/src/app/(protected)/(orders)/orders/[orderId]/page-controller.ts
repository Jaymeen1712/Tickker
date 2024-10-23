"use client";
import { fetchOrderItemById, UpdateOrderItemById } from "@/db/queries";
import { handleAPIResponse } from "@/utils";
import { OrderItem, OrderItemStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface SingleOrderPageControllerProps {
  orderId: string;
}

const useSingleOrderPageController = ({
  orderId,
}: SingleOrderPageControllerProps) => {
  const [order, setOrder] = useState<Partial<OrderItem>>();
  const [isFetchOrderLoading, setIsFetchOrderLoading] = useState(true);
  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false);

  const router = useRouter();

  const handleGetSingleOrder = useCallback(async () => {
    try {
      setIsFetchOrderLoading(true);
      const { errors, response } = await fetchOrderItemById(orderId);

      const result = handleAPIResponse(errors, response);

      if (result) {
        setOrder(result);
      }
    } finally {
      setIsFetchOrderLoading(false);
    }
  }, [orderId]);

  const handleOrderStatusChange = (status: OrderItemStatus) => {
    const updatedOrder = { ...order };
    updatedOrder.status = status;
    setOrder(updatedOrder);
  };

  const handleSubmit = async () => {
    if (!orderId) {
      return;
    }

    try {
      setIsSaveButtonLoading(true);
      const { errors, response } = await UpdateOrderItemById({
        orderItemId: orderId,
        data: {
          status: order?.status,
        },
      });

      const result = handleAPIResponse(errors, response);

      if (result) {
        router.push("/orders");
      }
    } finally {
      setIsSaveButtonLoading(false);
    }
  };

  useEffect(() => {
    handleGetSingleOrder();
  }, [handleGetSingleOrder]);

  return {
    order,
    isFetchOrderLoading,
    handleOrderStatusChange,
    handleSubmit,
    isSaveButtonLoading,
  };
};

export default useSingleOrderPageController;
