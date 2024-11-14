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
    categorizedProducts,
  } = useRemainingDashboardContainerController();

  return (
    <div className="container">
      <motion.div
        variants={heroRemainingVariants}
        initial={"hidden"}
        animate="visible"
      >
        {Object.entries(categorizedProducts).map(([key, products]) => (
          <ProductsContainerWithTitle title={key} key={key}>
            {products.map((product, index) => (
              <SingleProductCard key={index} product={product} />
            ))}
          </ProductsContainerWithTitle>
        ))}
      </motion.div>
    </div>
  );
};

export default RemainingDashboardContainer;
