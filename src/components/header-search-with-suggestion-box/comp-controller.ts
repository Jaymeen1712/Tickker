"use client";

import { fetchProductsBySearchQuery } from "@/db/queries";
import { useDebounce } from "@/hooks";
import { Product } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { InputProps } from "../ui/input";

const useHeaderWithSearchSuggestionBoxController = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchSuggestionBoxVisible, setIsSearchSuggestionBoxVisible] =
    useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isGetProductsLoading, setIsGetProductsLoading] = useState(true);
  const [isNoResultBannerVisible, setIsNoResultBannerVisible] = useState(false);

  const debouncedValue = useDebounce(searchQuery, 500);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();

  const router = useRouter();

  const handleGetSearchQueryProducts = useCallback(async () => {
    try {
      const query = debouncedValue || undefined;
      setIsGetProductsLoading(true);
      const { response } = await fetchProductsBySearchQuery(query, 5);

      if (response) {
        setProducts(response);
      }
    } finally {
      setIsGetProductsLoading(false);
    }
  }, [debouncedValue]);

  const handleSearchInputChange: InputProps["onChange"] = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSuggestionBoxVisibility = useCallback(async () => {
    if (debouncedValue) {
      setIsSearchSuggestionBoxVisible(true);
    } else {
      setIsSearchSuggestionBoxVisible(false);
    }
  }, [debouncedValue]);

  const handleSearchButtonClick = () => {
    router.push(`/search?query=${searchQuery}`);
    setIsSearchSuggestionBoxVisible(false);
  };

  useEffect(() => {
    if (debouncedValue && !products.length) {
      setIsNoResultBannerVisible(true);
    } else {
      setIsNoResultBannerVisible(false);
    }
  }, [debouncedValue, products.length]);

  useEffect(() => {
    handleSearchSuggestionBoxVisibility();
  }, [handleSearchSuggestionBoxVisibility]);

  useEffect(() => {
    handleGetSearchQueryProducts();
  }, [handleGetSearchQueryProducts]);

  useEffect(() => {
    const query = searchParams.get("query");
    query && setSearchQuery(query);
  }, [searchParams]);

  return {
    searchQuery,
    searchInputRef,
    isSearchSuggestionBoxVisible,
    setIsSearchSuggestionBoxVisible,
    products,
    isGetProductsLoading,
    handleSearchInputChange,
    handleSearchSuggestionBoxVisibility,
    isNoResultBannerVisible,
    handleSearchButtonClick,
  };
};

export default useHeaderWithSearchSuggestionBoxController;
