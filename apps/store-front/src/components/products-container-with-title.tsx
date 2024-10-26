import React from "react";

interface ProductsContainerWithTitleProps {
  title: string;
  children: React.ReactNode;
}

const ProductsContainerWithTitle: React.FC<ProductsContainerWithTitleProps> = ({
  title,
  children,
}) => {
  return (
    <div className="py-8">
      <h1 className="text-5xl font-light tracking-tighter">
        {title.toUpperCase()}
      </h1>
      <div className="flex flex-wrap gap-x-4 gap-y-8 py-8">{children}</div>
    </div>
  );
};

export default ProductsContainerWithTitle;
