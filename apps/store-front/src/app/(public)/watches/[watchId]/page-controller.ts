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

  const handleGetProduct = useCallback(async () => {
    try {
      const { errors, response } = await fetchSingleProductById(productId);
      const result = handleAPIResponse(errors, response);
      if (result) {
        setProduct(result);
      }
    } finally {
    }
  }, [productId]);

  useEffect(() => {
    handleGetProduct();
  }, [handleGetProduct]);

  return { product };
};

export default useSingleWatchPageController;
