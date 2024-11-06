import { Header } from "@/components";
import {
  ProductDetailsContainer,
  SingleProductHeroImageContainer,
} from "./_components";

const SingleWatchPage = () => {
  return (
    <>
      <div className="single-product-hero-image-gradient-container">
        <Header />
        <SingleProductHeroImageContainer />
      </div>
      <div className="single-product-remaining-gradient-container">
        <ProductDetailsContainer />
      </div>
    </>
  );
};

export default SingleWatchPage;
