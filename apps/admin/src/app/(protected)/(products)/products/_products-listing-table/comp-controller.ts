import { fetchAllProductsByProfileId } from "@/db/queries";
import { useAppStore } from "@/store";
import { handleAPIResponse } from "@/utils";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useProductsListingTableCompController = () => {
  const { profile } = useAppStore();

  const [isFetchAllProductsLoading, setIsFetchAllProductsLoading] =
    useState(true);
  const [productsList, setProductsList] = useState<Product[]>([]);

  const router = useRouter();

  const columns: {
    key: keyof Product;
    label?: string;
    className?: string;
    bodyClassName?: string;
    bodyOnClickHandler?: (id: string) => void;
  }[] = [
    {
      key: "id",
      label: "Product ID",
      bodyClassName: "font-semibold cursor-pointer",
      bodyOnClickHandler: (id: string) =>
        router.push(`/add-update-product/${id}`),
    },
    {
      key: "name",
    },
    {
      key: "price",
    },
    {
      key: "stock",
    },
    {
      key: "category",
    },
    {
      key: "brand",
    },
  ];

  const handleGetProducts = useCallback(async () => {
    if (!profile) {
      return;
    }

    try {
      const { id: profileId } = profile;
      setIsFetchAllProductsLoading(true);
      const { errors, response } = await fetchAllProductsByProfileId(profileId);

      const result = handleAPIResponse(errors, response);

      if (result) {
        setProductsList(result);
      }
    } finally {
      setIsFetchAllProductsLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    handleGetProducts();
  }, [handleGetProducts]);

  return { isFetchAllProductsLoading, productsList, columns };
};

export default useProductsListingTableCompController;
