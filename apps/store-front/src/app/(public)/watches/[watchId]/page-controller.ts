"use client";
import { fetchSingleProductById } from "@/db/queries";
import { handleAPIResponse } from "@/utils";
import { Product } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

interface SingleWatchPageControllerProps {
  productId: string;
}

const useSingleWatchPageController = ({
  productId,
}: SingleWatchPageControllerProps) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isGetProductLoading, setIsGetProductLoading] = useState(true);

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

  useEffect(() => {
    handleGetProduct();
  }, [handleGetProduct]);

  return { product, isGetProductLoading };
};

export default useSingleWatchPageController;
