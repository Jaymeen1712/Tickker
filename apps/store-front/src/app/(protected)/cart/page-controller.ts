"use client";

import {
  fetchCartByProfileId,
  fetchCartItemsIncludingProductsByCartId,
} from "@/db/queries";
import { useAppStore } from "@/store";
import { CartItemsIncludingProductType } from "@/types";
import { handleAPIResponse } from "@/utils";
import { Cart } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

const useCartPageController = () => {
  const [cartSubTotal, setCartSubTotal] = useState<number | undefined>(
    undefined,
  );
  const [cartItems, setCartItems] = useState<
    CartItemsIncludingProductType[] | undefined
  >(undefined);
  const [isScrolled, setIsScrolled] = useState(false);

  const { profile } = useAppStore();

  const handleGetCartItems = useCallback(async () => {
    if (!profile) {
      return;
    }

    try {
      const { id: profileId } = profile;
      const { errors, response } = await fetchCartByProfileId({ profileId });

      const result = handleAPIResponse(errors, response);

      if (result) {
        const { id: cartId } = result as Cart;
        const { errors, response } =
          await fetchCartItemsIncludingProductsByCartId({ cartId });

        const cartItemsResult = handleAPIResponse(errors, response);

        if (cartItemsResult) {
          setCartItems(cartItemsResult);
        }
      }
    } finally {
    }
  }, [profile, setCartItems]);

  useEffect(() => {
    handleGetCartItems();
  }, [handleGetCartItems]);

  useEffect(() => {
    if (cartItems) {
      const cartSubTotal = cartItems.reduce(
        (acc, cur) => acc + cur.product.price * cur.quantity,
        0,
      );

      setCartSubTotal(parseFloat(cartSubTotal.toFixed(2)));
    }
  }, [cartItems]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    cartItems,
    cartSubTotal,
    handleGetCartItems,
    isScrolled,
  };
};

export default useCartPageController;
