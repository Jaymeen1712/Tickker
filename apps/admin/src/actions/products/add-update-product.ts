"use server";

import * as z from "zod";

import { AddUpdateProductSchema } from "@/schemas";
import { db } from "@repo/database";

type UpdatedProductType = Omit<
  z.infer<typeof AddUpdateProductSchema>,
  "images"
> & {
  images: string[];
};

const AddUpdateProductAction = async (
  values: UpdatedProductType,
  profileId: string,
  productId?: string,
) => {
  const reqObj = values;

  try {
    if (productId) {
      await db.product.update({
        where: {
          id: productId,
          profileId,
        },
        data: reqObj,
      });
    } else {
      await db.product.create({
        data: {
          profileId,
          ...reqObj,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return {
      error:
        (typeof error === "string" && error) ?? "An unknown error occurred.",
    };
  }

  return {
    success: "Product is successfully created.",
  };
};

export default AddUpdateProductAction;
