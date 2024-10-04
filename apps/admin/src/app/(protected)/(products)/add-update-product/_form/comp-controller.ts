"use client";
import { AddUpdateProductAction } from "@/actions";
import { InputProps } from "@/components/ui/input";
import { TextareaProps } from "@/components/ui/textarea";
import { fetchProductById } from "@/db/queries";
import { AddUpdateProductSchema } from "@/schemas";
import { useAppStore } from "@/store";
import {
  convertFileToBase64,
  handleAPIResponse,
  handleShowError,
  handleShowSuccess,
  handleShowWarning,
} from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddUpdateProductFormCompControllerProps {
  productId?: string;
}

const useAddUpdateProductFormCompController = ({
  productId,
}: AddUpdateProductFormCompControllerProps) => {
  const [descriptionLength, setDescriptionLength] = useState<number>(0);
  const [error, setError] = useState<string | undefined>();
  const [isAddProductLoading, setIsAddProductLoading] = useState(false);
  const [images, setImages] = useState<Map<string, string>>(new Map());
  const [product, setProduct] = useState<Product | undefined>();

  const { profile } = useAppStore();

  const router = useRouter();

  const form = useForm<z.infer<typeof AddUpdateProductSchema>>({
    resolver: zodResolver(AddUpdateProductSchema),
    defaultValues: {
      category: "",
      images: "",
      name: "",
      price: undefined,
      stock: undefined,
      brand: "",
      description: "",
      isVisible: true,
    },
  });

  async function onSubmit(values: z.infer<typeof AddUpdateProductSchema>) {
    // Image validation
    const flattenImages = Array.from(images.values()).flat();
    if (flattenImages.length < 1) {
      form.setError("images", {
        message: "At least one product image is required",
      });
      return;
    }

    if (!profile) {
      handleShowError(3);
      return;
    }

    try {
      const { id: profileId } = profile;
      setIsAddProductLoading(true);

      const response = await AddUpdateProductAction(
        {
          ...values,
          images: flattenImages,
        },
        profileId,
        productId,
      );

      if (response?.error) {
        setError(response?.error);
      } else {
        handleShowSuccess(
          `Product successfully ${productId ? "updated" : "added"}.`,
        );
        router.push("/products");
      }
    } finally {
      setIsAddProductLoading(false);
    }
  }

  const handleDescriptionOnChange: TextareaProps["onChange"] = (e) => {
    setDescriptionLength(e.target.value.length);
  };

  const handleImageOnChange: InputProps["onChange"] = async (e) => {
    const files = e.target.files;

    if (files) {
      const filesLength = files.length;

      if (filesLength > 3) {
        handleShowWarning("Only 3 images are allowed.");
      }

      const newImages = new Map(images);

      const maxFiles = 3; // Maximum number of files to process

      for (let i = 0; i < maxFiles; i++) {
        const file = files[i];
        const base64File = await convertFileToBase64(file);
        const randomId = Math.random().toString(36).substr(2, 9);
        newImages.set(randomId, base64File);
      }

      setImages(newImages);
    }
  };

  const handleDeleteImage = (id: string) => {
    const tempImages = new Map(images);
    tempImages.delete(id);
    setImages(tempImages);
  };

  const handleGetProductById = useCallback(async (productId: string) => {
    try {
      const { errors, response } = await fetchProductById(productId);

      const result = handleAPIResponse(errors, response);

      if (result) {
        setProduct(result);
      }
    } finally {
    }
  }, []);

  useEffect(() => {
    if (product) {
      const {
        brand,
        category,
        description,
        isVisible,
        name,
        price,
        stock,
        images,
      } = product;
      form.reset({
        category,
        isVisible,
        name,
        price,
        stock,
        ...(brand && { brand }),
        ...(description && { description }),
      });

      const imagesMap = new Map();
      for (const image of images) {
        const randomId = Math.random().toString(36).substr(2, 9);
        imagesMap.set(randomId, image);
      }
      setImages(imagesMap);
    }
  }, [form, product]);

  useEffect(() => {
    if (productId) {
      handleGetProductById(productId);
    }
  }, [handleGetProductById, productId]);

  return {
    descriptionLength,
    handleDescriptionOnChange,
    form,
    onSubmit,
    error,
    isAddProductLoading,
    handleImageOnChange,
    images,
    handleDeleteImage,
  };
};

export default useAddUpdateProductFormCompController;
