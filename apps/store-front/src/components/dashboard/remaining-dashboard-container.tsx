"use client";

import { ProductsContainerWithTitle, SingleProductCard } from "@/components";
import { motion } from "framer-motion";
import useRemainingDashboardContainerController from "./remaining-dashboard-container-controller";

const RemainingDashboardContainer = () => {
  const {
    products,
    handleSearchInputChange,
    handleSearchInputClick,
    heroRemainingVariants,
  } = useRemainingDashboardContainerController();

  return (
    <div className="container">
      <motion.div
        variants={heroRemainingVariants}
        initial={"hidden"}
        animate="visible"
      >
        <ProductsContainerWithTitle title={"Space timer"}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SingleProductCard product={products[0]} key={index} />
          ))}
        </ProductsContainerWithTitle>
      </motion.div>
    </div>
  );
};

export default RemainingDashboardContainer;
