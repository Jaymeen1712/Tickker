"use server";
import { db } from "@/db";
import { WatchSpecificProductFieldsType } from "@/types";

export const fetchAllProducts = async ({
  filters,
}: {
  filters?: WatchSpecificProductFieldsType;
}) => {
  let response;
  let errors;

  try {
    const existingProducts = await db.product.findMany({
      where: {
        ...filters,
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

export const fetchSingleProductById = async (id: string) => {
  let response;
  let errors;

  try {
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (existingProduct) {
      response = existingProduct;
    } else {
      errors = ["Product is not available!"];
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const fetchProductsBySearchQuery = async (
  searchQuery: string | undefined,
  count?: number,
) => {
  let response;
  let errors;

  try {
    const searchQueryProducts = await db.product.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: "insensitive" } },
          { description: { contains: searchQuery, mode: "insensitive" } },
          { category: { contains: searchQuery, mode: "insensitive" } },
          { brand: { contains: searchQuery, mode: "insensitive" } },
        ],
      },
      take: count,
    });

    if (searchQueryProducts) {
      response = searchQueryProducts;
    } else {
      errors = ["Product is not available!"];
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};
