"use client";
import { Spinner } from "@/components";
import SingleProductShowcaseComp from "./_single-product";
import useSearchProductPageController from "./page-controller";

interface SearchProductPageProps {
  searchParams: {
    query: string;
  };
}

const SearchProductPage: React.FC<SearchProductPageProps> = ({
  searchParams,
}) => {
  const { query } = searchParams;
  const { isLoading, searchedProducts } = useSearchProductPageController({
    searchQuery: query,
  });

  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Search results</h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {searchedProducts.length ? (
            <div className="flex flex-col gap-y-4">
              {searchedProducts.map((product) => (
                <SingleProductShowcaseComp key={product.id} product={product} />
              ))}
            </div>
          ) : (
            "No products available"
          )}
        </>
      )}
    </div>
  );
};

export default SearchProductPage;
