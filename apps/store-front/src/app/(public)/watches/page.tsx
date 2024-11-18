"use client";

import {
  Header,
  ProductsContainerWithTitle,
  SingleProductCard,
  Spinner,
} from "@/components";
import { WatchesFilter } from "./_components";
import useWatchesPageController from "./page-controller";

const WatchesPage = () => {
  const { isScrolled, categorizedProducts, isGetProductsLoading } =
    useWatchesPageController();

  return (
    <>
      <div className="hero-image-gradient-container min-h-screen">
        <div
          className={`sticky top-0 z-20 transition-all ${isScrolled ? "backdrop-blur-3xl" : ""}`}
        >
          <Header />
          <WatchesFilter isGetProductsLoading={isGetProductsLoading} />
        </div>

        <div className="hide-scrollbar container relative overflow-y-auto">
          {isGetProductsLoading ? (
            <div className="py-12">
              <Spinner />
            </div>
          ) : (
            <>
              {categorizedProducts && (
                <>
                  {!Object.keys(categorizedProducts).length ? (
                    <div className="flex w-full justify-center py-20 text-xl uppercase">
                      No results found
                    </div>
                  ) : (
                    <>
                      {Object.entries(categorizedProducts).map(
                        ([key, products]) => (
                          <ProductsContainerWithTitle title={key} key={key}>
                            {products.map((product, index) => (
                              <SingleProductCard
                                key={index}
                                product={product}
                              />
                            ))}
                          </ProductsContainerWithTitle>
                        ),
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WatchesPage;
