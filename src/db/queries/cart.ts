"use server";
import { db } from "@/db";
import {
  CreateCartItemRequestObjType,
  CreateCartRequestObjType,
} from "@/types";
import { CartItem } from "@prisma/client";

export const createCartByProfileId = async ({
  profileId,
}: CreateCartRequestObjType) => {
  let response;
  let errors;

  try {
    const existingProducts = await db.cart.create({
      data: {
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

export const createProductInCart = async ({
  cartId,
  productId,
  quantity,
}: CreateCartItemRequestObjType) => {
  let response;
  let errors;

  try {
    const existingProducts = await db.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
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

export const fetchCartByProfileId = async ({
  profileId,
}: {
  profileId: string;
}) => {
  let response;
  let errors;

  try {
    const existingCart = await db.cart.findFirst({
      where: {
        profileId,
      },
    });

    if (existingCart) {
      response = existingCart;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const fetchCartItemsIncludingProductsByCartId = async ({
  cartId,
}: {
  cartId: string;
}) => {
  let response;
  let errors;

  try {
    const existingCartItems = await db.cartItem.findMany({
      where: {
        cartId,
      },
      include: {
        product: true,
      },
    });

    if (existingCartItems) {
      response = existingCartItems;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const updateCartItemById = async ({
  cartItemId,
  cartItem,
}: {
  cartItemId: string;
  cartItem: Partial<
    Omit<CartItem, "id" | "createdAt" | "updatedAt" | "productId" | "cartId">
  >;
}) => {
  let response;
  let errors;

  try {
    const updatedCartItem = await db.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        ...cartItem,
      },
    });

    if (updatedCartItem) {
      response = updatedCartItem;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const deleteAllCartItemsCartId = async ({
  cartId,
}: {
  cartId: string;
}) => {
  let response;
  let errors;

  try {
    const deletedCartItems = await db.cartItem.deleteMany({
      where: {
        cartId,
      },
    });

    if (deletedCartItems) {
      response = deletedCartItems;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};

export const removeCartItemById = async (cartItemId: string) => {
  let response;
  let errors;

  try {
    const deletedCartItem = await db.cartItem.delete({
      where: {
        id: cartItemId
      }
    });

    if (deletedCartItem) {
      response = deletedCartItem;
    }
  } catch (error) {
    errors = error;
  }

  return { errors, response };
};