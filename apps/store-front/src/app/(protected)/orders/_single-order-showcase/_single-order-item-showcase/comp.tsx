import { OrderItemIncludingProductType } from "@/types";
import Image from "next/image";
import useSingleOrderItemShowcaseCompController from "./comp-controller";

interface SingleOrderItemShowcaseCompProps {
  orderItem: OrderItemIncludingProductType;
}

const SingleOrderItemShowcaseComp: React.FC<
  SingleOrderItemShowcaseCompProps
> = ({ orderItem }) => {
  const { handleRedirectToProductPage } =
    useSingleOrderItemShowcaseCompController({
      productId: orderItem.product.id,
    });

  const { product } = orderItem;
  const { category, images, stock, model } = product;

  return (
    <div className="flex flex-col">
      <div
        className="single-product-card-gradient-container relative flex h-96 w-96 cursor-pointer flex-col justify-between rounded-3xl p-6"
        onClick={handleRedirectToProductPage}
      >
        <div className="z-10">
          <span className="w-fit rounded-3xl bg-white/5 px-4 py-2 text-sm backdrop-blur-3xl">
            Limited to {stock} pieces
          </span>
        </div>

        <div className="z-10 flex flex-col gap-y-2 pb-4 pl-4 uppercase">
          <span className="text-xs opacity-50">{model}</span>
          <span className="text-sm">{category}</span>
        </div>

        {/* Image container */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[240px] w-[240px]">
            <Image
              src={images[0]}
              alt="logo-maker"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderItemShowcaseComp;
