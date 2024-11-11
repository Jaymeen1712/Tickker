import { Prisma } from "@prisma/client";

export * from "./request-obj";

export interface CarouselSingleProductType {
  image: string[];
  name: string;
  desc?: string;
  price: string | number;
  brand?: string;
}

export type CartItemsIncludingProductType = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type OrderIncludingOrderItemsIncludingProductType =
  Prisma.OrderGetPayload<{
    include: {
      orderItems: {
        include: {
          product: true;
        };
      };
    };
  }>;

export type OrderItemIncludingProductType = Prisma.OrderItemGetPayload<{
  include: {
    product: true;
  };
}>;

export type WatchSpecificProductFieldsType = Partial<{
  brand: string;
  category: string;
  strap: string;
  buckle: string;
  strapSize: string;
  movement: string;
  waterResistance: string;
  caseMaterial: string;
  caseDiameter: string;
  dialColor: string;
}>;
