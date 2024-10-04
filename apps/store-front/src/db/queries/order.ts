"use server";
import { db } from "@/db";
import { Order, OrderItemStatus } from "@prisma/client";

export const createOrderByProfileId = async ({
  amount,
  profileId,
}: {
  amount: number;
  profileId: string;
}) => {
  let response;
  let errors;

  try {
    const createdOrder = await db.order.create({
      data: {
        amount,
        profileId,
      },
    });

    if (createdOrder) {
      response = createdOrder;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const createOrderItemsByOrderId = async ({
  orderId,
  price,
  productId,
  quantity,
  productOwnerId,
}: {
  quantity: number;
  price: number;
  productId: string;
  orderId: string;
  productOwnerId: string;
}) => {
  let response;
  let errors;

  try {
    const createdOrderItem = await db.orderItem.create({
      data: {
        price,
        productId,
        quantity,
        orderId,
        productOwnerId,
      },
    });

    if (createdOrderItem) {
      response = createdOrderItem;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const fetchOrderById = async ({ orderId }: { orderId: string }) => {
  let response;
  let errors;

  try {
    const fetchedOrder = await db.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (fetchedOrder) {
      response = fetchedOrder;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const updateOrderById = async ({
  orderId,
  order,
}: {
  orderId: string;
  order: Partial<
    Omit<Order, "id" | "profileId" | "amount" | "createdAt" | "updatedAt">
  >;
}) => {
  let response;
  let errors;

  try {
    const updatedOrder = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        ...order,
      },
    });

    if (updatedOrder) {
      response = updatedOrder;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const fetchOrdersByProfileId = async ({
  profileId,
}: {
  profileId: string;
}) => {
  let response;
  let errors;

  try {
    const fetchedOrders = await db.order.findMany({
      where: {
        profileId,
      },
      select: {
        id: true,
        paymentStatus: true,
        amount: true,
        orderItems: {
          select: {
            id: true,
            price: true,
            quantity: true,
            product: true,
            status: true,
          },
        },
      },
    });

    if (fetchedOrders) {
      response = fetchedOrders;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const updateAllOrderItemStatusByOrderId = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderItemStatus;
}) => {
  let response;
  let errors;

  try {
    const updatedOrderItems = await db.orderItem.updateMany({
      where: {
        orderId,
      },
      data: {
        status,
      },
    });

    if (updatedOrderItems) {
      response = updatedOrderItems;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const updateOrderItemById = async ({
  orderItemId,
  status,
}: {
  orderItemId: string;
  status: OrderItemStatus;
}) => {
  let response;
  let errors;

  try {
    const updatedOrderItem = await db.orderItem.update({
      where: {
        id: orderItemId,
      },
      data: {
        status,
      },
    });

    if (updatedOrderItem) {
      response = updatedOrderItem;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};
