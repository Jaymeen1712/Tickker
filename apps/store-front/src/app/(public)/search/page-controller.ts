"use client";

import { fetchProductsBySearchQuery } from "@/db/queries";
import { useAppStore } from "@/store";
import { Product } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

interface SearchProductPageControllerProps {
  searchQuery: string;
}

const useSearchProductPageController = ({
  searchQuery,
}: SearchProductPageControllerProps) => {
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);

  const { isLoading, setIsLoading } = useAppStore();

  const handleGetSearchQueryProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const { response } = await fetchProductsBySearchQuery(searchQuery);

      if (response) {
        setSearchedProducts(response);
      }
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, setIsLoading]);

  useEffect(() => {
    handleGetSearchQueryProducts();
  }, [handleGetSearchQueryProducts]);

  useEffect(() => {
    return () => {
      setIsLoading(true);
    };
  }, [setIsLoading]);

  return { isLoading, searchedProducts };
};

export default useSearchProductPageController;
