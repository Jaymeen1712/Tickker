"use client";
import {
  createOrderByProfileId,
  createOrderItemsByOrderId,
  deleteAllCartItemsCartId,
  fetchCartByProfileId,
  fetchCartItemsIncludingProductsByCartId,
} from "@/db/queries";
import { useAppStore } from "@/store";
import { CartItemsIncludingProductType } from "@/types";
import { handleAPIResponse, handleShowError } from "@/utils";
import { Cart, Order } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductsPaymentCompControllerProps {
  cartSubTotal: number | undefined;
}

const useProductsPaymentCompController = ({
  cartSubTotal,
}: ProductsPaymentCompControllerProps) => {
  const [isBuyButtonLoading, setIsBuyButtonLoading] = useState(false);
  const [total, setTotal] = useState<
    | {
        weightedTotal: string;
        excludeWeightedTotal: string;
        includeWeightedTotal: string;
      }
    | undefined
  >();

  const { profile } = useAppStore();

  const router = useRouter();

  const handleGetCartDetails = async (profileId: string) => {
    const { errors, response } = await fetchCartByProfileId({ profileId });

    return handleAPIResponse(errors, response);
  };

  const handleGetCartItems = async (cartId: string) => {
    const { errors, response } = await fetchCartItemsIncludingProductsByCartId({
      cartId,
    });

    return handleAPIResponse(errors, response);
  };

  const handleCreateOrder = async (profileId: string, cartSubTotal: number) => {
    const { errors, response } = await createOrderByProfileId({
      profileId,
      amount: cartSubTotal,
    });

    return handleAPIResponse(errors, response);
  };

  const handleBuyButtonClick = async () => {
    try {
      setIsBuyButtonLoading(true);
      if (!profile) {
        handleShowError(3);
        return;
      }

      const { id: profileId } = profile;

      const cartResult = await handleGetCartDetails(profileId);

      if (!cartResult) {
        handleShowError(3);
        return;
      }

      const { id: cartId } = cartResult as Cart;

      const cartItemsResult = await handleGetCartItems(cartId);

      if (!cartItemsResult) {
        handleShowError(3);
        return;
      }

      const cartSubTotal = (
        cartItemsResult as CartItemsIncludingProductType[]
      ).reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);

      const orderResult = await handleCreateOrder(profileId, cartSubTotal);

      if (!orderResult) {
        handleShowError(3);
        return;
      }

      const { id: orderId } = orderResult as Order;

      const cartItemPromises = (
        cartItemsResult as CartItemsIncludingProductType[]
      ).map(async (cartItem) => {
        const { quantity, product } = cartItem;
        const { price, id: productId, profileId: productOwnerId } = product;

        return createOrderItemsByOrderId({
          orderId,
          price,
          productId,
          quantity,
          productOwnerId,
        });
      });

      await Promise.all(cartItemPromises);

      // Pending handle if one of the order item or all order items are not added in order
      // results.forEach(({ errors, response }, index) => {
      //   const result = handleAPIResponse(errors, response)
      // });

      // if success
      await deleteAllCartItemsCartId({ cartId });
      router.push(`/payment/${orderId}`);
    } finally {
      setIsBuyButtonLoading(false);
    }
  };

  useEffect(() => {
    if (cartSubTotal && cartSubTotal !== 0) {
      const weightedTotal = cartSubTotal && (cartSubTotal * 18) / 100;

      setTotal({
        excludeWeightedTotal: `${cartSubTotal}.00 ₹`,
        includeWeightedTotal: `${weightedTotal + cartSubTotal} ₹`,
        weightedTotal: `${weightedTotal} ₹`,
      });
    } else {
      setTotal({
        excludeWeightedTotal: `0`,
        includeWeightedTotal: `0`,
        weightedTotal: `0`,
      });
    }
  }, [cartSubTotal]);

  return {
    handleBuyButtonClick,
    isBuyButtonLoading,
    total,
  };
};

export default useProductsPaymentCompController;
