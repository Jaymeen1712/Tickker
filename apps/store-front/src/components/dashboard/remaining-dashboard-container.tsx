"use client";

import { ProductsContainerWithTitle, SingleProductCard } from "@/components";
import useRemainingDashboardContainerController from "./remaining-dashboard-container-controller";

const RemainingDashboardContainer = () => {
  const { products, handleSearchInputChange, handleSearchInputClick } =
    useRemainingDashboardContainerController();

  return (
    <div className="container">
      <ProductsContainerWithTitle title={"Space timer"}>
        {Array.from({ length: 6 }).map((_, index) => (
          <SingleProductCard product={products[0]} key={index} />
        ))}
      </ProductsContainerWithTitle>
    </div>
  );
};

export default RemainingDashboardContainer;
