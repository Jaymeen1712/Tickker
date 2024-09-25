import {
  CustomButton,
  CustomLabelValuePair,
  QuantitySelector,
} from "@/components";
import { CartItemsIncludingProductType } from "@/types";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import useCartShowcaseProductCompController from "./comp-controller";

interface CartShowcaseSingleProductCompProps {
  cartItem: CartItemsIncludingProductType;
  handleGetCartItems: () => void;
}

const CartShowcaseSingleProductComp: React.FC<
  CartShowcaseSingleProductCompProps
> = ({ cartItem, handleGetCartItems }) => {
  const {
    handleProductQuantityChange,
    isProdQuantityLoading,
    handleRedirectToIndividualProductPage,
    isRemoveCartItemLoading,
    handleRemoveCartItem,
  } = useCartShowcaseProductCompController({
    cartItem,
    handleGetCartItems,
  });

  const { product, quantity } = cartItem;
  const { brand, category, description, images, name, price } = product;

  return (
    <div className="grid grid-cols-4 items-center gap-x-6 py-2">
      <div className="relative col-span-1 h-[120px] w-full rounded-md">
        <Image
          src="/wallhaven-m95x7k.jpg"
          alt="logo-maker"
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="col-span-3 grid grid-cols-4 gap-x-2">
        {/* Product details container */}
        <div className="col-span-3 flex flex-col space-y-2">
          <div>
            <span
              className="cursor-pointer text-base font-semibold"
              onClick={handleRedirectToIndividualProductPage}
            >
              {name}
            </span>
            <span className="line-clamp-2 text-ellipsis">{description}</span>
          </div>
          <div>
            <CustomLabelValuePair label="Brand" value={brand} />
            <CustomLabelValuePair label="Category" value={category} />
            <CustomLabelValuePair label="Price" value={price} />
          </div>
        </div>

        {/* Price and quantity container */}
        <div className="col-span-1 flex flex-col justify-center">
          <QuantitySelector
            onQuantityChange={handleProductQuantityChange}
            initialQuantity={quantity}
            isBothButtonDisable={isProdQuantityLoading}
            decreaseButtonClassName="rounded-b-none"
            increaseButtonClassName="rounded-b-none"
          />
          <CustomButton
            className="w-full rounded-t-none bg-red-600 text-xl hover:bg-red-700"
            loading={isRemoveCartItemLoading}
            onClick={handleRemoveCartItem}
          >
            <MdDelete />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CartShowcaseSingleProductComp;
