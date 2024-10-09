"use server";

import { db } from "@/db";
import { OrderItem } from "@prisma/client";

export const fetchOrderItemsByProductOwnerId = async (
  productOwnerId: string,
) => {
  let response;
  let errors;

  try {
    const existingOrderItems = await db.orderItem.findMany({
      where: {
        productOwnerId,
      },
    });

    if (existingOrderItems) {
      response = existingOrderItems;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const fetchOrderItemById = async (orderItemId: string) => {
  let response;
  let errors;

  try {
    const existingOrderItem = await db.orderItem.findUnique({
      where: {
        id: orderItemId,
      },
    });

    if (existingOrderItem) {
      response = existingOrderItem;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const UpdateOrderItemById = async ({
  orderItemId,
  data,
}: {
  orderItemId: string;
  data: Partial<OrderItem>;
}) => {
  let response;
  let errors;

  try {
    const updatedOrderItem = await db.orderItem.update({
      where: {
        id: orderItemId,
      },
      data,
    });

    if (updatedOrderItem) {
      response = updatedOrderItem;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};
