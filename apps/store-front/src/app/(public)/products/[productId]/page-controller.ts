"use client";

import {
  createOrderByProfileId,
  createOrderItemsByOrderId,
  createProductInCart,
  fetchCartByProfileId,
  fetchSingleProductById,
} from "@/db/queries";
import { useAppStore } from "@/store";
import {
  handleAPIResponse,
  handleNoProfileInPublicTemplate,
  handleShowError,
  handleShowSuccess,
} from "@/utils";
import { Cart, Order, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface SingleProductShowcasePageControllerProps {
  productId: string;
}

interface CustomImageType {
  image: string;
  id: string;
}

interface UpdatedProductImage extends Omit<Product, "images"> {
  images: CustomImageType[];
}

const useSingleProductShowcasePageController = ({
  productId,
}: SingleProductShowcasePageControllerProps) => {
  const [product, setProduct] = useState<UpdatedProductImage>();
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
  const [heroImage, setHeroImage] = useState<CustomImageType>({
    image: "",
    id: Math.random().toString(36),
  });

  const { profile } = useAppStore();

  const router = useRouter();

  const handleGetProduct = useCallback(async () => {
    try {
      setIsGetProductLoading(true);
      const { errors, response } = await fetchSingleProductById(productId);
      const result = handleAPIResponse(errors, response);
      if (result) {
        const { images } = result;
        const updatedImages = images.map((image: string) => ({
          id: Math.random().toString(36),
          image,
        }));
        setProduct({
          ...result,
          images: updatedImages,
        });
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
        handleNoProfileInPublicTemplate();
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
      if (!profile) {
        handleNoProfileInPublicTemplate();
        return;
      }

      if (!product) {
        handleShowError(3);
        return;
      }

      const { id: profileId } = profile;
      const { price, profileId: productOwnerId } = product;
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
          productOwnerId,
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

  const handleProductImageClick = (image: CustomImageType) => {
    setHeroImage(image);
  };

  useEffect(() => {
    if (product) {
      setHeroImage(product.images?.[0]);
    }
  }, [product]);

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
    handleProductImageClick,
    heroImage,
  };
};

export default useSingleProductShowcasePageController;
