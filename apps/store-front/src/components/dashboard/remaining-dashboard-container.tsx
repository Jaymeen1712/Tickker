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
          {products.map((product, index) => (
            <SingleProductCard product={product} key={index} />
          ))}
        </ProductsContainerWithTitle>
      </motion.div>
    </div>
  );
};

export default RemainingDashboardContainer;
