"use client";

import { removeCartItemById, updateCartItemById } from "@/db/queries";
import { CartItemsIncludingProductType } from "@/types";
import { handleAPIResponse } from "@/utils";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface CartShowcaseSingleProductCompControllerProps {
  cartItem: CartItemsIncludingProductType;
  handleGetCartItems: () => void;
}

const useCartShowcaseProductCompController = ({
  cartItem,
  handleGetCartItems,
}: CartShowcaseSingleProductCompControllerProps) => {
  const { id } = useMemo(() => cartItem, [cartItem]);
  const [isProdQuantityLoading, setIsProdQuantityLoading] = useState(false);
  const [isRemoveCartItemLoading, setIsRemoveCartItemLoading] = useState(false);

  const router = useRouter();

  const handleProductQuantityChange = async (quantity: number) => {
    try {
      setIsProdQuantityLoading(true);
      const { errors, response } = await updateCartItemById({
        cartItem: { quantity },
        cartItemId: id,
      });

      handleAPIResponse(errors, response);
      handleGetCartItems();
    } finally {
      setIsProdQuantityLoading(false);
    }
  };

  const handleRemoveCartItem = async () => {
    try {
      setIsRemoveCartItemLoading(true);
      await removeCartItemById(id);
      handleGetCartItems();
    } finally {
      setIsRemoveCartItemLoading(false);
    }
  };

  const handleRedirectToIndividualProductPage = () => {
    const { product } = cartItem;
    const { id } = product;
    router.push(`/products/${id}`);
  };

  return {
    handleProductQuantityChange,
    isProdQuantityLoading,
    handleRedirectToIndividualProductPage,
    isRemoveCartItemLoading,
    handleRemoveCartItem,
  };
};

export default useCartShowcaseProductCompController;
