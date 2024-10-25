import { CustomLabelValuePair } from "@/components";
import { OrderItemIncludingProductType } from "@/types";
import Image from "next/image";
import useSingleOrderItemShowcaseCompController from "./comp-controller";

interface SingleOrderItemShowcaseCompProps {
  orderItem: OrderItemIncludingProductType;
}

const SingleOrderItemShowcaseComp: React.FC<
  SingleOrderItemShowcaseCompProps
> = ({ orderItem }) => {
  const { handleRedirectToIndividualProductPage } =
    useSingleOrderItemShowcaseCompController({
      productId: orderItem.product.id,
    });

  const { price, quantity, product, status } = orderItem;
  const { brand, category, description, images, name } = product;

  return (
    <div className="grid grid-cols-4 items-center gap-x-6 px-8 py-2">
      <div className="relative col-span-1 h-[120px] w-full rounded-md">
        <Image
          src={images?.[0]}
          alt="logo-maker"
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      {/* Product details container */}
      <div className="col-span-3 flex space-y-2">
        <div className="flex flex-1 flex-col">
          <span
            className="cursor-pointer text-base font-semibold"
            onClick={handleRedirectToIndividualProductPage}
          >
            {name}
          </span>
          <span className="line-clamp-4 text-ellipsis">{description}</span>
        </div>
        <div className="flex flex-col justify-center">
          <CustomLabelValuePair label="Brand" value={brand} />
          <CustomLabelValuePair label="Category" value={category} />
          <CustomLabelValuePair label="Quantity" value={quantity} />
          <CustomLabelValuePair label="Status" value={status} />
        </div>
      </div>
    </div>
  );
};

export default SingleOrderItemShowcaseComp;
