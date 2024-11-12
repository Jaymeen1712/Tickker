"use client";

import { removeCartItemById } from "@/db/queries";
import { CartItemsIncludingProductType } from "@/types";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface CartShowcaseSingleProductCompControllerProps {
  cartItem: CartItemsIncludingProductType;
  handleGetCartItems: () => void;
}

const useCartShowcaseProductCompController = ({
  cartItem,
  handleGetCartItems,
}: CartShowcaseSingleProductCompControllerProps) => {
  const { id, productId } = useMemo(() => cartItem, [cartItem]);

  const router = useRouter();

  const handleRemoveCartItem = async () => {
    try {
      await removeCartItemById(id);
      handleGetCartItems();
    } finally {
    }
  };

  const handleRedirectToProductPage = () => {
    router.push(`/watches/${productId}`);
  };
  return {
    handleRemoveCartItem,
    handleRedirectToProductPage,
  };
};

export default useCartShowcaseProductCompController;
