"use client";

import {
  Header,
  ProductsContainerWithTitle,
  SingleProductCard,
} from "@/components";
import { WatchesFilter } from "./_components";
import useWatchesPageController from "./page-controller";

const WatchesPage = () => {
  const { isScrolled, categorizedProducts } = useWatchesPageController();

  return (
    <>
      <div className="hero-image-gradient-container min-h-screen">
        <div
          className={`sticky top-0 z-20 transition-all ${isScrolled ? "backdrop-blur-3xl" : ""}`}
        >
          <Header />
          <WatchesFilter />
        </div>

        <div className="hide-scrollbar container relative overflow-y-auto">
          {Object.entries(categorizedProducts).map(([key, products]) => (
            <ProductsContainerWithTitle title={key} key={key}>
              {products.map((product, index) => (
                <SingleProductCard key={index} product={product} />
              ))}
            </ProductsContainerWithTitle>
          ))}
        </div>
      </div>
    </>
  );
};

export default WatchesPage;
