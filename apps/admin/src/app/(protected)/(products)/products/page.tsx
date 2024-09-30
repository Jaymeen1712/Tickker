"use client";
import { CustomButton } from "@/components";
import { useRouter } from "next/navigation";
import ProductsListingTableComp from "./_products-listing-table";

const ProductsPage = () => {
  const router = useRouter();

  return (
    <div className="container">
      <CustomButton onClick={() => router.push("/add-update-product")}>
        Add Product
      </CustomButton>
      <ProductsListingTableComp />
    </div>
  );
};

export default ProductsPage;
