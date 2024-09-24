import Spinner from "@/components/spinner";
import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
import useSearchSuggestionBoxController from "./comp-controller";
import SingleProductComp from "./single-product-showcase/comp";

interface SearchSuggestionBoxProps {
  searchInputRef: React.RefObject<HTMLInputElement>;
  isSearchSuggestionBoxVisible: boolean;
  setIsSearchSuggestionBoxVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  products: Product[];
  isGetProductsLoading: boolean;
  isNoResultBannerVisible?: boolean;
}

const SearchSuggestionBox: React.FC<SearchSuggestionBoxProps> = ({
  searchInputRef,
  isSearchSuggestionBoxVisible,
  setIsSearchSuggestionBoxVisible,
  isGetProductsLoading,
  products,
  isNoResultBannerVisible,
}) => {
  const { searchContainerRef } = useSearchSuggestionBoxController({
    searchInputRef,
    setIsSearchSuggestionBoxVisible,
  });

  return (
    <>
      {isSearchSuggestionBoxVisible && (
        <div
          className="mt-2 rounded-b-md border bg-white"
          ref={searchContainerRef}
        >
          {isGetProductsLoading ? (
            <div className="my-32">
              <Spinner />
            </div>
          ) : (
            <>
              {!isNoResultBannerVisible ? (
                <div className="flex flex-col">
                  {products.map((product) => (
                    <SingleProductComp key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="relative h-52 w-52">
                    <Image
                      src="/img-no-product-found.png"
                      alt="logo-maker"
                      fill
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="text-center text-xl font-bold">
                    No Products Found
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SearchSuggestionBox;
