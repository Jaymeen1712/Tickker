"use server";

import { db } from "@/db";
import { CreateProductReqObjType } from "@/types";
import { Product } from "@prisma/client";
import { eachWeekOfInterval, format } from "date-fns";

export const createProductByProfileId = async (
  reqObj: CreateProductReqObjType,
) => {
  let response;
  let errors;

  try {
    const createdProduct = await db.product.create({
      data: reqObj,
    });

    if (createdProduct) {
      response = createdProduct;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const fetchAllProductsByProfileId = async (profileId: string) => {
  let response;
  let errors;

  try {
    const existingProducts = await db.product.findMany({
      where: {
        profileId,
      },
    });

    if (existingProducts) {
      response = existingProducts;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const fetchProductById = async (productId: string) => {
  let response;
  let errors;

  try {
    const existingProduct = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (existingProduct) {
      response = existingProduct;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const UpdateProductById = async ({
  productId,
  data,
}: {
  productId: string;
  data: Partial<Product>;
}) => {
  let response;
  let errors;

  try {
    const existingProduct = await db.product.update({
      where: {
        id: productId,
      },
      data,
    });

    if (existingProduct) {
      response = existingProduct;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

// - Calculate array of weeks using start and end date
// - Map over weeks to get response
export const fetchWeeklySoldProductsByProfileId = async ({
  profileId,
  startDate,
  endDate,
}: {
  profileId: string;
  startDate: Date;
  endDate: Date;
}) => {
  let response: { date: string; sales: number }[] = [];
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
          },
        });

        return {
          date: format(weekStart, "yyyy-MM-dd"),
          sales: orderItems.reduce((acc, cur) => acc + cur.quantity, 0),
        };
      }),
    );
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};
