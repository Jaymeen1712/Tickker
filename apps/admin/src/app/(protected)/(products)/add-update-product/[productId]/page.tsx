import React from "react";
import AddUpdateProductFormComp from "../_form";

interface UpdateProductPageProps {
  params: {
    productId: string;
  };
}

const UpdateProductPage: React.FC<UpdateProductPageProps> = ({ params }) => {
  const { productId } = params;
  return <AddUpdateProductFormComp productId={productId} />;
};

export default UpdateProductPage;
