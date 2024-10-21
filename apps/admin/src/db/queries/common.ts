"use server";

import { db } from "@repo/database";
import { eachWeekOfInterval, format } from "date-fns";

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

// Get unique order items by mapping weeks
// Get unique profile ids using customersIDs array
export const fetchWeeklyCustomersByProfileId = async ({
  profileId,
  startDate,
  endDate,
}: {
  profileId: string;
  startDate: Date;
  endDate: Date;
}) => {
  let customersIDs: string[] = [];
  let response: { date: string; customers: number }[] = [];
  let errors;

  try {
    const weeks = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 },
    );

    for (const weekStart of weeks) {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      // Step 1: Fetch OrderItems within the specified date range
      const orderItems = await db.orderItem.findMany({
        where: {
          createdAt: {
            gte: weekStart,
            lte: weekEnd,
          },
          productOwnerId: profileId,
        },
        select: {
          orderId: true,
        },
      });

      // Step 2: Get unique orderIds
      const uniqueOrderIds = Array.from(
        new Set(orderItems.map((item) => item.orderId)),
      );

      // Step 3: Fetch orders corresponding to unique orderIds and get their profileIds
      const orders = await db.order.findMany({
        where: {
          id: {
            in: uniqueOrderIds,
          },
          profileId: {
            notIn: customersIDs,
          },
        },
        select: {
          profileId: true,
        },
      });

      // Step 4: Get unique profileIds
      const uniqueProfileIds = Array.from(
        new Set(orders.map((order) => order.profileId)),
      );

      if (!uniqueProfileIds.length) {
        response.push({
          date: format(weekStart, "yyyy-MM-dd"),
          customers: 0,
        });
        continue;
      }

      customersIDs.push(...uniqueProfileIds);

      response.push({
        date: format(weekStart, "yyyy-MM-dd"),
        customers: uniqueProfileIds.length,
      });
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

// Map over each week and get the count of order items for that week
// Multiply quantity and price to get revenue generated each week
export const fetchWeeklyRevenueByProfileId = async ({
  profileId,
  startDate,
  endDate,
}: {
  profileId: string;
  startDate: Date;
  endDate: Date;
}) => {
  let response: { date: string; revenue: number }[] = [];
  let errors;

  try {
    const weeks = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 },
    );

    // Map over each week and get the count of order items for that week
    response = await Promise.all(
      weeks.map(async (weekStart) => {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);

        const orderItems = await db.orderItem.findMany({
          where: {
            createdAt: {
              gte: weekStart,
              lt: weekEnd,
            },
            productOwnerId: profileId,
          },
          select: {
            quantity: true,
            price: true,
          },
        });

        return {
          date: format(weekStart, "yyyy-MM-dd"),
          revenue: orderItems.reduce(
            (acc, { price, quantity }) => acc + quantity * price,
            0,
          ),
        };
      }),
    );
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};
