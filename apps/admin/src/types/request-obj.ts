import { Product } from "@prisma/client";
import { CommonOmitType } from ".";

export interface CreateCartRequestObjType {
  profileId: string;
}

export interface CreateCartItemRequestObjType {
  productId: string;
  cartId: string;
  quantity: number;
}

export interface FetchProfileByUserIdRequestObjType {
  userId: string;
}

export type CreateProductReqObjType = Omit<Product, CommonOmitType | "rating">;
