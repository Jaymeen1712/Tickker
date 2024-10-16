"use server";

import { db } from "@repo/database";

export const fetchCustomersByProfileId = async (profileId: string) => {
  let response;
  let errors;

  try {
    const orderItems = await db.orderItem.findMany({
      where: {
        productOwnerId: profileId,
      },
      select: {
        orderId: true,
      },
    });

    if (!orderItems) {
      return { response: [] };
    }

    const orderIDs = Array.from(
      new Set(orderItems.map((orderItem) => orderItem.orderId)),
    );

    const orders = await db.order.findMany({
      where: {
        id: {
          in: orderIDs,
        },
      },
      select: {
        profileId: true,
      },
    });

    if (!orders) {
      return { response: [] };
    }

    const customerIDs = Array.from(
      new Set(orders.map((order) => order.profileId)),
    );

    const customers = await db.profile.findMany({
      where: {
        id: {
          in: customerIDs,
        },
      },
    });

    if (customers) {
      response = customers;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};
