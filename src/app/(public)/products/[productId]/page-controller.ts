"use client";

import {
  createOrderByProfileId,
  createOrderItemsByOrderId,
  createProductInCart,
  fetchCartByProfileId,
  fetchSingleProductById,
} from "@/db/queries";
import { useAppStore } from "@/store";
import { handleAPIResponse, handleShowError, handleShowSuccess } from "@/utils";
import { Cart, Order, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface SingleProductShowcasePageControllerProps {
  productId: string;
}

const useSingleProductShowcasePageController = ({
  productId,
}: SingleProductShowcasePageControllerProps) => {
  const [product, setProduct] = useState<Product>();
  const [isGetProductLoading, setIsGetProductLoading] = useState(true);
  const [productModifications, setProductModifications] = useState<{
    quantity: number;
  }>({
    quantity: 1,
  });
  const [isBuyButtonLoading, setIsBuyButtonLoading] = useState(false);
  const [handlePrevClick, setHandlePrevClick] = useState<() => void>(() => {});
  const [handleNextClick, setHandleNextClick] = useState<() => void>(() => {});
  const [isPrevDisable, setIsPrevDisable] = useState(false);
  const [isNextDisable, setIsNextDisable] = useState(false);

  const { profile } = useAppStore();

  const router = useRouter();

  const handleGetProduct = useCallback(async () => {
    try {
      setIsGetProductLoading(true);
      const { errors, response } = await fetchSingleProductById(productId);
      const result = handleAPIResponse(errors, response);
      if (result) {
        setProduct(result);
      }
    } finally {
      setIsGetProductLoading(false);
    }
  }, [productId]);

  const handleProductQuantityChange = (quantity: number) => {
    setProductModifications((prev) => ({ ...prev, quantity }));
  };

  const handleAddToCartButtonClick = async () => {
    try {
      if (!profile) {
        handleShowError(3);
        window.location.reload();
        return;
      }

      const { id } = profile;

      const { errors, response } = await fetchCartByProfileId({
        profileId: id,
      });

      const cartResult = handleAPIResponse(errors, response);

      if (cartResult) {
        const { id: cartId } = cartResult as Cart;
        const { quantity } = productModifications;

        const { errors, response } = await createProductInCart({
          cartId,
          productId,
          quantity,
        });

        const result = handleAPIResponse(errors, response);

        if (result) {
          handleShowSuccess("Product successfully added in cart.");
        }
      }
    } finally {
    }
  };

  const handleBuyNowButtonClick = async () => {
    try {
      setIsBuyButtonLoading(true);
      if (!profile || !product) {
        handleShowError(3);
        return;
      }

      const { id: profileId } = profile;
      const { price } = product;
      const { quantity } = productModifications;

      const { errors, response } = await createOrderByProfileId({
        profileId,
        amount: quantity * price,
      });

      const result = handleAPIResponse(errors, response);

      if (result) {
        const { id: orderId } = result as Order;

        const { errors } = await createOrderItemsByOrderId({
          orderId,
          price,
          productId,
          quantity,
        });

        if (errors) {
          handleShowError(3);
        } else {
          router.push(`/payment/${orderId}`);
        }
      }
    } finally {
      setIsBuyButtonLoading(false);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, [handleGetProduct]);

  return {
    product,
    isGetProductLoading,
    handleProductQuantityChange,
    handleAddToCartButtonClick,
    handleBuyNowButtonClick,
    productModifications,
    isBuyButtonLoading,
    handlePrevClick,
    setHandlePrevClick,
    handleNextClick,
    setHandleNextClick,
    isPrevDisable,
    setIsPrevDisable,
    isNextDisable,
    setIsNextDisable,
  };
};

export default useSingleProductShowcasePageController;
