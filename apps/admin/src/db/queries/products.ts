"use server";

import { db } from "@/db";
import { CreateProductReqObjType } from "@/types";
import { Product } from "@prisma/client";

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
