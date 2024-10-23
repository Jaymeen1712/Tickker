import { Switch } from "@/components/ui/switch";
import { fetchAllProductsByProfileId, UpdateProductById } from "@/db/queries";
import { useAppStore } from "@/store";
import { handleAPIResponse } from "@/utils";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const useProductsListingTableCompController = () => {
  const { profile } = useAppStore();

  const [isFetchAllProductsLoading, setIsFetchAllProductsLoading] =
    useState(true);
  const [productsList, setProductsList] = useState<Product[]>([]);

  const router = useRouter();

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

  const handleChangeProductVisibilityChange = useCallback(
    async ({
      productId,
      isVisible,
    }: {
      productId: string;
      isVisible: boolean;
    }) => {
      try {
        const { errors, response } = await UpdateProductById({
          data: {
            isVisible,
          },
          productId,
        });

        const result = handleAPIResponse(errors, response);

        if (result) {
          handleGetProducts();
        }
      } finally {
      }
    },
    [handleGetProducts],
  );

  const columns: {
    key: keyof Product;
    label?: string;
    className?: string;
    bodyClassName?: string;
    bodyOnClickHandler?: (id: string) => void;
    customBody?: (
      value: string | React.ReactNode | number | boolean | Date,
      id: string,
    ) => React.ReactNode;
  }[] = useMemo(
    () => [
      {
        key: "isVisible",
        label: "Visible",
        bodyClassName: "font-semibold cursor-pointer",
        customBody: (value, id) => (
          <Switch
            checked={value as boolean}
            onCheckedChange={(checked) => {
              handleChangeProductVisibilityChange({
                isVisible: checked,
                productId: id,
              });
            }}
          />
        ),
      },
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
    ],
    [handleChangeProductVisibilityChange, router],
  );

  useEffect(() => {
    handleGetProducts();
  }, [handleGetProducts]);

  return { isFetchAllProductsLoading, productsList, columns, router };
};

export default useProductsListingTableCompController;
