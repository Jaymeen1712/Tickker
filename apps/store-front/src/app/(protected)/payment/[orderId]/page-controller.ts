"use client";

import {
  fetchOrderById,
  updateAllOrderItemStatusByOrderId,
  updateOrderById,
} from "@/db/queries";
import { handleAPIResponse, handleShowError, handleShowSuccess } from "@/utils";
import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface PaymentPageController {
  orderId: string;
}

const usePaymentPageController = ({ orderId }: PaymentPageController) => {
  const [order, setOrder] = useState<Order>();
  const [isPaymentButtonLoading, setIsPaymentButtonLoading] = useState(false);
  const [total, setTotal] = useState<
    | {
        weightedTotal: string;
        excludeWeightedTotal: string;
        includeWeightedTotal: string;
      }
    | undefined
  >();

  const router = useRouter();

  const handleGetOrder = useCallback(async () => {
    try {
      const { errors, response } = await fetchOrderById({
        orderId,
      });

      const result = handleAPIResponse(errors, response);

      if (result) {
        setOrder(result);
      }
    } finally {
    }
  }, [orderId]);

  const handlePaymentButtonClick = async () => {
    try {
      setIsPaymentButtonLoading(true);
      const { errors } = await updateOrderById({
        orderId,
        order: {
          paymentStatus: "COMPLETED",
        },
      });

      if (errors) {
        handleShowError(0, "Payment is not successful.");
      } else {
        await updateAllOrderItemStatusByOrderId({
          orderId,
          status: "PROCESSING",
        });
        handleShowSuccess("Payment is successful.");
        router.push("/orders");
      }
    } finally {
      setIsPaymentButtonLoading(false);
    }
  };

  useEffect(() => {
    if (order && order.amount) {
      const amount = order.amount;
      const weightedTotal = amount && (amount * 18) / 100;

      setTotal({
        excludeWeightedTotal: `${amount}.00 ₹`,
        includeWeightedTotal: `${weightedTotal + amount} ₹`,
        weightedTotal: `${weightedTotal} ₹`,
      });
    } else {
      setTotal({
        excludeWeightedTotal: `0`,
        includeWeightedTotal: `0`,
        weightedTotal: `0`,
      });
    }
  }, [order]);

  useEffect(() => {
    handleGetOrder();
  }, [handleGetOrder]);

  return {
    handlePaymentButtonClick,
    isPaymentButtonLoading,
    total,
  };
};

export default usePaymentPageController;
