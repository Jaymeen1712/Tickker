"use client";

import {
  Header,
  ProductsContainerWithTitle,
  SingleProductCard,
} from "@/components";
import { WatchesFilter } from "./_components";
import useWatchesPageController from "./page-controller";

const WatchesPage = () => {
  const { isScrolled } = useWatchesPageController();

  return (
    <>
      <div className="hero-image-gradient-container min-h-screen">
        <div
          className={`sticky top-0 z-20 transition-all ${isScrolled ? "backdrop-blur-3xl" : ""}`}
        >
          <Header />
          <WatchesFilter />
        </div>

        <div className="hide-scrollbar container relative h-screen overflow-y-auto">
          <ProductsContainerWithTitle title="Space timer">
            {[...Array(3)].map((_, index) => (
              // @ts-ignore
              <SingleProductCard key={index} />
            ))}
          </ProductsContainerWithTitle>
        </div>
      </div>
    </>
  );
};

export default WatchesPage;
