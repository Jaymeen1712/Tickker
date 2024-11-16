"use client";
import { Header } from "@/components";
import {
  ProductDetailsContainer,
  SingleProductHeroImageContainer,
} from "./_components";
import useSingleWatchPageController from "./page-controller";

interface SingleWatchPageProps {
  params: {
    watchId: string;
  };
}

const SingleWatchPage: React.FC<SingleWatchPageProps> = ({ params }) => {
  const { watchId } = params;
  const { product, similarProducts } = useSingleWatchPageController({
    productId: watchId,
  });

  return (
    <>
      <div className="single-product-hero-image-gradient-container">
        <Header />
        <SingleProductHeroImageContainer
          product={product}
          productId={watchId}
        />
      </div>
      <div className="single-product-remaining-gradient-container">
        <ProductDetailsContainer
          product={product}
          similarProducts={similarProducts}
        />
      </div>
    </>
  );
};

export default SingleWatchPage;
