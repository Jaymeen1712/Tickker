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
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [isPaymentButtonLoading, setIsPaymentButtonLoading] = useState(false);

  const router = useRouter();

  const handleGetOrder = useCallback(async () => {
    try {
      setIsOrderLoading(true);
      const { errors, response } = await fetchOrderById({
        orderId,
      });

      const result = handleAPIResponse(errors, response);

      if (result) {
        setOrder(result);
      }
    } finally {
      setIsOrderLoading(false);
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
    handleGetOrder();
  }, [handleGetOrder]);

  return {
    order,
    isOrderLoading,
    handlePaymentButtonClick,
    isPaymentButtonLoading,
  };
};

export default usePaymentPageController;
